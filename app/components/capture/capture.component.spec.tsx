import * as React from "react"
import { fireEvent, render, waitFor } from "test-utils"
import { Capture } from "./capture.component"

describe("<Capture>", () => {
  it("should show no image", async () => {
    const { getByText, queryByText } = render(
      <Capture label="Simples imagem" onChange={jest.fn()} />,
    )

    expect(getByText("Adicionar Imagem")).toBeTruthy()
    expect(queryByText("Simples imagem")).toBeFalsy()
  })
  it("should show single image", async () => {
    const { getByText, getAllByRole } = render(
      <Capture label="Simples imagem" images={["sadsadsa"]} onChange={jest.fn()} />,
    )

    expect(getByText("Trocar Imagem")).toBeTruthy()
    expect(getByText("Simples imagem")).toBeTruthy()
    expect(getAllByRole("image").length).toBe(1)
  })
  it("should show multiple image", async () => {
    const images = ["image1", "image2", "image3", "image4", "image5"]
    const { getByText, getAllByRole } = render(
      <Capture label="Simples imagem" images={images} onChange={jest.fn()} />,
    )

    expect(getByText("Trocar Imagem")).toBeTruthy()
    expect(getByText("Simples imagem")).toBeTruthy()
    expect(getAllByRole("image").length).toBe(images.length)
  })

  it("should call change image", async () => {
    const newImages = ["newImage"]
    let images = [] as string[]
    const onChange = jest.fn()
    const { getByText, queryByText, debug } = render(
      <Capture label="Simples imagem" images={images} onChange={onChange} />,
    )

    expect(getByText("Adicionar Imagem")).toBeTruthy()
    expect(queryByText("Simples imagem")).toBeFalsy()

    fireEvent.press(getByText("Adicionar Imagem"))
    await waitFor(() => expect(onChange).toBeCalledWith(newImages))
  })
})
