import { useState, useEffect } from "react";
import { Flex, TextField, View } from "@adobe/react-spectrum";
import { Car as CarData } from "../../types/Car";
import Car from "@spectrum-icons/workflow/Car";
import { Button } from "@adobe/react-spectrum";
import { Text } from "@adobe/react-spectrum";
import RentModal from "../cars/components/RentModal";
import { DialogTrigger } from "@adobe/react-spectrum";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";

const CarDetails = () => {
  const { carId } = useParams();
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState<CarData>();

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || '""')
  );
  const token = user.token;
  const photoPath = `/static/${carData ? carData.photo : ""}.png`;
  const userId = user.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_NEXT_URL}/${carId}`, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setCarData(res.body));
  }, []);

  //const nextCarRents = car?.rents.length > 0 ? car.rents : []; //filter all rents that are gonna be in the future, pass it to modals
  //TODO: car details fetch to be added
  function handleCarRental(
    carId: number,
    userId: number,
    date: any,
    dueDate: any
  ) {
    //check if this car is available this time
    //fetch post -> create new rent
    const createRentDto = {
      userId,
      carId,
      date:
        date.year +
        "-" +
        (date.month.toString().length === 1 ? "0" : "") +
        date.month +
        "-" +
        (date.day.toString().length === 1 ? "0" : "") +
        date.day +
        "T08:00:00.000Z",
      dueDate:
        dueDate.year +
        "-" +
        (dueDate.month.toString().length === 1 ? "0" : "") +
        dueDate.month +
        "-" +
        (dueDate.day.toString().length === 1 ? "0" : "") +
        dueDate.day +
        "T08:00:00.000Z",
    };

    fetch(`${process.env.REACT_APP_NEXT_URL}/rents`, {
      method: "POST",
      body: JSON.stringify(createRentDto),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }

  function handleCarAvailabilityCheck(carId: number, date: any, dueDate: any) {
    setOpen(true);
    const dateFrom =
      "" +
      date.year +
      "-" +
      (date.month.toString().length === 1 ? "0" + date.month : date.month) +
      "-" +
      (date.day.toString().length === 1 ? "0" + date.day : date.day) +
      "T08:00:00.000Z";
    const dateTo =
      "" +
      dueDate.year +
      "-" +
      (dueDate.month.toString().length === 1
        ? "0" + dueDate.month
        : dueDate.month) +
      "-" +
      (dueDate.day.toString().length === 1 ? "0" + dueDate.day : dueDate.day) +
      "T08:00:00.000Z";
    //check if there are any rents in selected dates
    let isBooked = false;

    if (carData && carData.rents)
      for (const rent of carData.rents) {
        if (
          (new Date(dateFrom) >= new Date(rent.date) &&
            new Date(dateFrom) <= new Date(rent.dueDate)) ||
          (new Date(dateTo) >= new Date(rent.date) &&
            new Date(dateTo) <= new Date(rent.dueDate)) ||
          (new Date(dateFrom) <= new Date(rent.date) &&
            new Date(dateTo) >= new Date(rent.date))
        ) {
          console.log("konflikt dat");
          isBooked = true;
        } else {
          console.log("brak konfliktu");
        }
      }
    return isBooked;
  }

  return (
    <PageContainer checkAuthorized>
      <View UNSAFE_style={{ backgroundColor: "rgba(0,0,0,0.5)" }} width="70%">
        <Flex direction="row" justifyContent="space-evenly">
          <Flex direction="column" gap="size-150" wrap>
            <TextField
              label="Brand"
              defaultValue={carData ? carData.brand : ""}
              isDisabled={true}
            />
            <TextField
              label="Model"
              defaultValue={carData ? carData.model : ""}
              isDisabled={true}
            />
            <TextField
              label="Production year"
              defaultValue={carData ? carData.productionYear.toString() : ""}
              isDisabled={true}
            />
            <TextField
              label="Power"
              defaultValue={carData ? carData.power.toString() : ""}
              isDisabled={true}
            />
            <TextField
              label="Capacity"
              defaultValue={carData ? carData.capacity.toString() : ""}
              isDisabled={true}
            />
            <TextField
              label="Number of seats"
              defaultValue={
                carData && carData.numberOfSeats
                  ? carData.numberOfSeats.toString()
                  : ""
              }
              isDisabled={true}
            />
            <TextField
              label="Transmission"
              defaultValue={carData ? carData.transmission : ""}
              isDisabled={true}
            />
            <TextField
              label="Cost of rent per day"
              defaultValue={carData ? carData.costPerDay.toString() : ""}
              isDisabled={true}
            />
          </Flex>
          <Flex direction="column" marginTop="20px">
            <img src={photoPath} alt="car photo" width="240px" />
            <DialogTrigger type="modal">
              <Button
                variant="primary"
                marginTop="20px"
                onPress={() => setOpen(true)}>
                <Car />
                <Text>Rent me!</Text>
              </Button>
              <RentModal
                carId={carData ? carData.id : 0}
                userId={userId || 1}
                costPerDay={carData ? carData.costPerDay : 0}
                closeHandler={setOpen}
                confirmHandler={handleCarRental}
                checkAvailabilityHandler={handleCarAvailabilityCheck}
              />
            </DialogTrigger>
          </Flex>
        </Flex>
      </View>
    </PageContainer>
  );
};

export default CarDetails;
