import { useFormik } from "formik"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  PresenceTransition,
  Spinner,
  VStack,
  WarningOutlineIcon,
  ZStack,
} from "native-base"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { LoginStyles as styles } from "./login.styles"

export interface LoginProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
type SignInRequest = { username: string; password: string }
export const LoginContainer = observer(function Login(props: LoginProps) {
  const {
    userStore: { error, signIn, status },
  } = useStores()

  const handleSignIn = async (values: SignInRequest) => {
    await signIn(values.username, values.password)
  }

  const { handleSubmit, handleChange, handleBlur, values } = useFormik<SignInRequest>({
    initialValues: { username: "", password: "" },
    onSubmit: handleSignIn,
  })

  const isSigningIn = status === "signingIn"


  return (
    <VStack space={3} testID="loginContainer" mt="5">
      <FormControl>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          testID="username"
          value={values.username}
          placeholder="Preencha com o seu username"
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Senha</FormControl.Label>
        <Input
          type="password"
          placeholder="Preencha com a sua senha"
          testID="password"
          autoCapitalize={'none'}
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
        />
      </FormControl>
      {error && (
        <HStack space={2} testID="error">
          <WarningOutlineIcon color="danger.500" />
          <Heading size="xs" testID="error" color="danger.500">
            {error}
          </Heading>
        </HStack>
      )}
      <Box>
        <ZStack mt="2" w={"full"} alignItems="center">
          {!isSigningIn && (
            <Button w="full" focusable testID="login" onPress={handleSubmit}>
              Entrar
            </Button>
          )}

          <PresenceTransition
            as={Box}
            visible={isSigningIn}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 250 } }}
          >
            <Box w="full" h="full">
              <Spinner mt={3} />
            </Box>
          </PresenceTransition>
        </ZStack>
      </Box>
    </VStack>
  )
})
