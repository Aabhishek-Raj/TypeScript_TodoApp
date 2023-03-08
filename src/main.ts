import './css/style.css'
import Wholelist from './model/WholeList'
import ItemList from './model/ItemList'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const wholeList = Wholelist.instance
    const templates = ListTemplate.instance

    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement

    itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
        e.preventDefault()

        const input = document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if(!newEntryText) return

        const itemId: number = wholeList.list.length
            ? parseInt(wholeList.list[wholeList.list.length - 1].id) + 1
            : 1

        const newItem = new ItemList(itemId.toString(), newEntryText)

        wholeList.addItem(newItem)

        templates.render(wholeList)
    })

    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        wholeList.clearList()
        templates.clear()
    })

    wholeList.load()
    templates.render(wholeList)
}

document.addEventListener('DOMContentLoaded', initApp)
