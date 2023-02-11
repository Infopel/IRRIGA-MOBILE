import React from 'react'
import { fireEvent, render } from 'test-utils'
import { MultiSelect, } from './multi-select.component'
import { Option} from '../dropdown-list/dropdown-list.component'
describe("MultiSelect", () => {
    const defaultItems = [{ id: "1", "name": "Banana" }, { id: "2", "name": "Cabbage" }, { id: "3", "name": "Onions" }, { id: "4", "name": "Sweet pepper" },{ id: "5", "name": "Tomato" }]
    it("render empty MultiSelect", () => {
        const ___defaultItems = [] as Option[]
        const selectedItems = [] as Option[]
        const onSelectItems = jest.fn()
        const label = "Bom dia"
        const { toJSON } = render(<MultiSelect options={___defaultItems} label={label} onSelectItems={onSelectItems} selectedItems={selectedItems} />)

        expect(toJSON()).toMatchSnapshot()
    })
    it("render with items", () => {
        const selectedItems = [] as Option[]
        const onSelectItems = jest.fn()
        const label = "Bom dia"
        const { toJSON, getByText, getAllByLabelText } = render(<MultiSelect options={defaultItems} label={label} onSelectItems={onSelectItems} selectedItems={selectedItems} />)

        expect(getAllByLabelText(/dropdown-item/i).length).toBe(defaultItems.length)

        for (const item of defaultItems) {
            expect(getByText(item.name)).toBeTruthy()
        }

        expect(toJSON()).toMatchSnapshot()
    })
    it("render with selected items", () => {
        const selectedItems = [defaultItems[1], defaultItems[3]]
        const onSelectItems = jest.fn()
        const label = "Bom dia"
        const { toJSON, getByText, getByLabelText,getAllByLabelText, getAllByAccessibilityState, debug } = render(<MultiSelect options={defaultItems} label={label} onSelectItems={onSelectItems} selectedItems={selectedItems} />)
        
        expect(getAllByAccessibilityState({ checked: true }).length).toBe(selectedItems.length)

        for (const item of selectedItems) {
            expect(getAllByLabelText(`chip-item-${item.name}`).length).toBe(2)
            expect(getByLabelText(`dropdown-item-${item.name}`)).toBeTruthy()
        }

        expect(toJSON()).toMatchSnapshot()
    })
    it("Call selected items", () => {
        const selectedItems = [defaultItems[1], defaultItems[3]]
        const onSelectItems = jest.fn()
        const label = "Bom dia"
        const { toJSON, getByText, getByLabelText,getAllByLabelText, getAllByAccessibilityState, debug } = render(<MultiSelect options={defaultItems} label={label} onSelectItems={onSelectItems} selectedItems={selectedItems} />)
        
        expect(getAllByAccessibilityState({ checked: true }).length).toBe(selectedItems.length)

        for (const item of selectedItems) {
            expect(getAllByLabelText(`chip-item-${item.name}`).length).toBe(2)
            expect(getByLabelText(`dropdown-item-${item.name}`)).toBeTruthy()
        }

        expect(toJSON()).toMatchSnapshot()
    })
    
})