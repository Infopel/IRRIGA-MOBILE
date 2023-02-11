import { MaterialIcons } from "@expo/vector-icons"
import { FormBottomBar, FormSkeleton, Screen } from "components"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import { Box, Center, Flex, Heading, Icon, VStack } from "native-base"
import { ScreenNavigationProps } from "navigators"
import React, { FunctionComponent } from "react"
import { FormBodyContainer, FormSubmissionModalContainer } from "../../containers"

export const FormScreen: FunctionComponent<ScreenNavigationProps<"form">> = observer(function (
  props,
) {
  // Pull in one of our MST stores
  const {
    formStore: {
      fieldsFromCurrentPage: fields,
      requestForm,
      nextPage,
      previousPage,
      pageInfo,
      saveForm,
      error,
      form,
      requestPreviousForm,
      isRequestingForm,
    },
  } = useStores()

  React.useEffect(() => {
    //@ts-ignore
    if (!props.route.params.loadPrevious) {
      //@ts-ignore
      requestForm(props.route.params.formId)
    } else {
      requestPreviousForm()
    }
  }, [])
  const lastPage = pageInfo?.lastPage ?? false
  const firstPage = pageInfo?.firstPage ?? false

  if (isRequestingForm)
    return (
      <Screen>
        <FormSkeleton />
      </Screen>
    )

  if (!form || !pageInfo)
    return (
      <Screen>
        <VStack justifyContent={"center"} flex={1}>
          <Center>
            <Icon name="warning" size="32" color="primary.500" as={MaterialIcons} />
            <Box
              borderRadius={"full"}
              _light={{
                bg: "light.200",
              }}
              _dark={{
                bg: "dark.200",
              }}
              p={5}
            >
              <Heading>{error}</Heading>
            </Box>
          </Center>
        </VStack>
      </Screen>
    )

  return (
    <Screen>
      <VStack w={["full", "md"]} alignSelf="center" flex={1}>
        <Flex grow={1} flexDirection="column">
          <FormBodyContainer flex={1} fields={fields} formId={form?.id} />
        </Flex>
        <FormBottomBar {...{ nextPage, previousPage, lastPage, firstPage, saveForm }} />
      </VStack>
      <FormSubmissionModalContainer />
      {/* <FormErrorMessage isVisible={!isNil(error)}/> */}
    </Screen>
  )
})
