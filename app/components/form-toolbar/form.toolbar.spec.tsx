import React from 'react'
import { fireEvent, render, screen } from "utils"
import { FormToolbar } from './form-toolbar.component'
describe("<FormToolbar>", () => {
    it("renders", () => {

        const changePage = jest.fn()
        const pageNumber = 5
        const pageTitle = "Simples titulo"
        const disabledPages: number[] = []
        const totalPages = 8
        render(<FormToolbar {...{ changePage, disabledPages, pageNumber, pageTitle, totalPages }} />)
        expect(screen.getAllByRole('button').length).toBe(totalPages + 1)
        expect(screen.getByAccessibilityState({ selected: true })).toBeTruthy()
    })
    it("should renders 2 disabled pages", () => {

        const changePage = jest.fn()
        const pageNumber = 5
        const pageTitle = "Simples titulo"
        const disabledPages = [2, 3]
        const totalPages = 8
        render(<FormToolbar {...{ changePage, disabledPages, pageNumber, pageTitle, totalPages }} />)
        expect(screen.getAllByRole('button').length).toBe(totalPages + 1)
        expect(screen.getByAccessibilityState({ selected: true })).toBeTruthy()
        expect(screen.getAllByAccessibilityState({ disabled: true }).length).toBe(2)
    })

    it("should show disabled content", () => {
        const changePage = jest.fn()
        const pageNumber = 5
        const pageTitle = "Simples titulo"
        const totalPages = 8
        const disabledPages = [2, 3]
        render(<FormToolbar {...{ changePage, disabledPages, pageNumber, pageTitle, totalPages }} />)
        expect(screen.getAllByAccessibilityState({ disabled: true }).length).toBe(disabledPages.length)
        expect(screen.toJSON()).toMatchSnapshot()

    })

    it("renders - snapshot", () => {

        const changePage = jest.fn()
        const pageNumber = 5
        const pageTitle = "Simples titulo"
        const totalPages = 8
        const disabledPages: number[] = []
        render(<FormToolbar {...{ changePage, disabledPages, pageNumber, pageTitle, totalPages }} />)
        expect(screen.toJSON()).toMatchSnapshot()
    })


    it("should change page be called", () => {
        const changePage = jest.fn()
        const pageNumber = 5
        const pageTitle = "Simples titulo"
        const totalPages = 8
        const disabledPages = [2, 3]
        render(<FormToolbar {...{ changePage, disabledPages, pageNumber, pageTitle, totalPages }} />)
        screen.debug()
        const btn = screen.getAllByRole('button')[2]
        expect(btn).toBeTruthy()
        fireEvent.press(btn)

        expect(changePage).toBeCalled()
    })
})