import React from 'react'
import { fireEvent, render } from 'test-utils'
import { Chips, Item } from './chips.component'
describe("Chips", () => {
    const defaultItems = [{ id: "1", "name": "Banana" }, { id: "2", "name": "Cabbage" }, { id: "3", "name": "Onions" }, { id: "4", "name": "Tomato" }] as Item[]
    it("render empty chips", () => {
        const selectedItems = [] as string[]
        const onChangeItems = jest.fn()
        const ___defaultItems = [] as Item[]
        const { toJSON } = render(<Chips items={___defaultItems} onSelectItems={onChangeItems} selectedItems={selectedItems} />)
        expect(toJSON()).toMatchSnapshot()
    })
    it("should render Selectable chips ", () => {
        const selectedItems = [] as string[]
        const onChangeItems = jest.fn()
        const { queryByText, queryAllByLabelText } = render(<Chips items={defaultItems} onSelectItems={onChangeItems} selectedItems={selectedItems} />)

        expect(queryAllByLabelText(/chip-item/i).length).toBe(defaultItems.length)
        for (const item of defaultItems) {
            expect(queryByText(item.name)).toBeTruthy()
        }
    })
    it("should render select 2 chips", () => {
        const selectedItems = ["3", "1"] as string[]
        const onChangeItems = jest.fn()
        const { debug, queryByText, getAllByLabelText, getAllByA11yState } = render(<Chips items={defaultItems} onSelectItems={onChangeItems} selectedItems={selectedItems} />)

        expect(getAllByLabelText(/chip-item/i).length).toBe(defaultItems.length)
        expect(getAllByA11yState({ selected: true }).length).toBe(selectedItems.length)
        for (const item of selectedItems) {

            expect(queryByText(defaultItems.find((x) => x.id === item)?.name as string)).toBeTruthy()
        }
    })
    it("should onSelectedItems be called", () => {
        const selectedItems = [] as string[]
        const onChangeItems = jest.fn()
        const { getByText } = render(<Chips items={defaultItems} onSelectItems={onChangeItems} selectedItems={selectedItems} />)

        const selectedItem = defaultItems[1]
        fireEvent.press(getByText(selectedItem.name))
        expect(onChangeItems).toBeCalledWith(
            selectedItem.id, [selectedItem.id]
        )

    })
    it("render action - filled action chip", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const { debug, queryByText, queryAllByLabelText, queryByLabelText } = render(<Chips items={defaultItems} onAction={onAction} onItemClick={onItemClick} />)

        expect(queryAllByLabelText(/chip-item/i).length).toBe(defaultItems.length)
        expect(queryByLabelText('edit-chip')).toBeTruthy()
        for (const item of defaultItems) {
            expect(queryByText(item.name)).toBeTruthy()
        }
    })
    it("render action - empty action chip", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const ___defaultItems = [] as Item[]
        const { queryAllByLabelText, queryByLabelText } = render(<Chips items={___defaultItems} onAction={onAction} onItemClick={onItemClick} />)

        expect(queryAllByLabelText(/chip-item/i).length).toBe(0)
        expect(queryByLabelText('action-chip')).toBeTruthy()
    })
    it("render action - action chip", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const ___defaultItems = [] as Item[]
        const { queryAllByLabelText, queryByLabelText } = render(<Chips items={___defaultItems} onAction={onAction} onItemClick={onItemClick} />)

        expect(queryAllByLabelText(/chip-item/i).length).toBe(0)
        expect(queryByLabelText('action-chip')).toBeTruthy()
    })
    it("should on action button be called", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const ___defaultItems = [] as Item[]
        const { queryAllByLabelText, getByLabelText } = render(<Chips items={___defaultItems} onAction={onAction} onItemClick={onItemClick} />)
        fireEvent.press(getByLabelText('action-chip'))
        expect(onAction).toBeCalled()
    })
    it("should on item press button be called", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const { getByText } = render(<Chips items={defaultItems} onAction={onAction} onItemClick={onItemClick} />)

        const selectedItem = defaultItems[1]
        fireEvent.press(getByText(selectedItem.name))
        expect(onItemClick).toBeCalledWith(
            selectedItem.id, 'press'
        )

    })
    it("should on item delete button be called", () => {
        const onItemClick = jest.fn()
        const onAction = jest.fn()
        const { getByLabelText } = render(<Chips items={defaultItems} onAction={onAction} onItemClick={onItemClick} />)

        const selectedItem = defaultItems[1]
        fireEvent.press(getByLabelText("delete-" + selectedItem.name))
        expect(onItemClick).toBeCalledWith(
            selectedItem.id, 'delete'
        )

    })
})