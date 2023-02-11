import React from 'react'
import { fireEvent, render } from 'test-utils'
import { DropdownList, Option } from './dropdown-list.component'
describe("DropdownList", () => {
    const defaultItems = [{ id: "1", "name": "Banana" }, { id: "2", "name": "Cabbage" }, { id: "3", "name": "Onions" }, { id: "4", "name": "Sweet pepper" }, { id: "5", "name": "Tomato" }]
    const label = "Bom dia"
    const isVisible = true
    const toggleClose = jest.fn()
    it("render visible DropdownList", async () => {
        const ___defaultItems = [] as Option[]
        const selectedItems = [] as string[]
        const onChangeSelectedItems = jest.fn()
        const { toJSON, getByA11yState } = render(<DropdownList options={___defaultItems}  {...{ label, isVisible, toggleClose, onChangeSelectedItems, selectedItems }} />)

        expect(getByA11yState({ expanded: true })).toBeTruthy()
        expect(toJSON()).toMatchSnapshot()
    })
    it("should be minimized", async () => {
        const ___defaultItems = [] as Option[]
        const selectedItems = [] as string[]
        const onChangeSelectedItems = jest.fn()
        const { getByA11yState } = render(<DropdownList options={___defaultItems}  {...{ label, isVisible: false, toggleClose, onChangeSelectedItems, selectedItems }} />)
        expect(getByA11yState({ expanded: false })).toBeTruthy()
    })
    it("should toggle close", () => {
        const ___defaultItems = [] as Option[]
        const selectedItems = [] as string[]
        const onChangeSelectedItems = jest.fn()
        const { toJSON, getByRole } = render(<DropdownList options={___defaultItems}  {...{ label, isVisible: false, toggleClose, onChangeSelectedItems, selectedItems }} />)
        fireEvent.press(getByRole('button', { name: 'close' }))
        expect(toJSON()).toMatchSnapshot()
    })
    it("render with items", () => {
        const selectedItems = [] as string[]
        const onChangeSelectedItems = jest.fn()
        const { toJSON, getByText, getAllByLabelText } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems }} />)

        expect(getAllByLabelText(/dropdown-item/i).length).toBe(defaultItems.length)

        for (const item of defaultItems) {
            expect(getByText(item.name)).toBeTruthy()
        }

        expect(toJSON()).toMatchSnapshot()
    })
    it("render with selected items", () => {
        const selectedItems = [defaultItems[1], defaultItems[3]].map((x) => x.id)
        const onChangeSelectedItems = jest.fn()
        const { toJSON, getByLabelText, getAllByAccessibilityState } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems }} />)

        expect(getAllByAccessibilityState({ checked: true }).length).toBe(selectedItems.length)

        for (const i of selectedItems) {
            const item = defaultItems.find(x => x.id === i)
            expect(getByLabelText(`chip-item-${item?.name}`)).toBeTruthy()
            expect(getByLabelText(`dropdown-item-${item?.name}`)).toBeTruthy()
        }

        expect(toJSON()).toMatchSnapshot()
    })
    it("should return single selected item after press with previous clean list", async () => {
        const selectedItems = [] as string[]
        const onChangeSelectedItems = jest.fn()
        const { getByLabelText, } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems }} />)
        const selectedItem = defaultItems[1]
        fireEvent.press(getByLabelText(`dropdown-item-${selectedItem.name}`))



        expect(onChangeSelectedItems).toBeCalledWith(selectedItem.id, [selectedItem.id])
    })
    it("should return 3 selected items with list previously filled with 2 items", async () => {
        22
        const selectedItems = [defaultItems[2], defaultItems[3]]
        const selectedItemsStringified = selectedItems.map((x) => x.id)
        const onChangeSelectedItems = jest.fn()
        const { getByLabelText } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems: selectedItemsStringified }} />)
        const selectedItem = defaultItems[1]
        fireEvent.press(getByLabelText(`dropdown-item-${selectedItem.name}`))

        expect(onChangeSelectedItems).toBeCalledWith(selectedItem.id, [...selectedItemsStringified, selectedItem.id])
    })
    it("should return 2 selected items with list previously filled with 3 items", async () => {
        const selectedItems = [defaultItems[4], defaultItems[2], defaultItems[3]]
        const selectedItemsStringified = selectedItems.map((x) => x.id)
        const onChangeSelectedItems = jest.fn()
        const { getByLabelText, } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems: selectedItemsStringified }} />)
        const selectedItem = selectedItems[1]
        fireEvent.press(getByLabelText(`dropdown-item-${selectedItem.name}`))

        expect(onChangeSelectedItems).toBeCalledWith(selectedItem.id, selectedItemsStringified.filter((x) => x !== selectedItem.id))
    })
    it("should handle cancel button onAction dropdown", async () => {
        
        const isSetChangeOnComplete = true

        const selectedItems = [defaultItems[4], defaultItems[2], defaultItems[3]]
        const selectedItemsStringified = selectedItems.map((x) => x.id)
        const onChangeSelectedItems = jest.fn()
        const { getByRole, } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems: selectedItemsStringified, isSetChangeOnComplete }} />)
        fireEvent.press(getByRole("button", { name: /cancel/i }))

        expect(toggleClose).toBeCalled()
    })
    it("should handle save button onAction dropdown", async () => {
        //Anchor 
        const isSetChangeOnComplete = true
        
        const selectedItems = [defaultItems[4], defaultItems[2], defaultItems[3]]
        const selectedItemsStringified = selectedItems.map((x) => x.id)
        const onChangeSelectedItems = jest.fn()
        const { getByRole } = render(<DropdownList {...{ options: defaultItems, label, isVisible, toggleClose, onChangeSelectedItems, selectedItems: selectedItemsStringified, isSetChangeOnComplete}} />)

        fireEvent.press(getByRole('button', { name: /save/i }))

        expect(toggleClose).toBeCalledWith()
        expect(onChangeSelectedItems).toBeCalledWith(null, selectedItemsStringified)
    })



})