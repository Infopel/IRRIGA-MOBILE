import { observer } from "mobx-react-lite"
import { Box, Center, Image } from "native-base"
import React from "react"
import { LoginContainer } from "../../containers/login"

export const LoginScreen: React.FunctionComponent = observer(
  function LoginScreen() {
    return (
      
      <Center testID="login-screen" h={"100%"} w="100%" background={"white"} pt={-20}>
        <Box safeArea p="2" py="8" w="90%" maxW="390">
          <Center>
            <Image mb={8} alt='Application Logo' source={require("./../../../assets/images/logo.jpg")} />
          </Center>
          <LoginContainer />
        </Box>
      </Center>
    )
  },
)
