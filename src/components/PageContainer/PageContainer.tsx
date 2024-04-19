import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, View } from "@adobe/react-spectrum";
import style from "./PageContainer.module.scss";
import Footer from "../Footer";
import Header from "../Header";

type PageContainerProps = {
  children: any;
  checkAuthorized?: boolean;
};

const PageContainer = ({
  children,
  checkAuthorized,
}: PageContainerProps): JSX.Element => {
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");
  console.log(user);

  useEffect(() => {
    if (checkAuthorized && !user) {
      setUnauthorized(true);
      navigate("/auth/signin");
    }
  }, []);

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center">
      <Header />
      <div className={style.experiment}>
        <View
          paddingBottom="40px"
          minHeight="85vh"
          width="60%"
          UNSAFE_style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            flex="1 0 auto">
            {!unauthorized ? children : <h2>{"You're unauthorized!"}</h2>}
          </Flex>
        </View>
      </div>
      <Footer />
    </Flex>
  );
};

export default PageContainer;
