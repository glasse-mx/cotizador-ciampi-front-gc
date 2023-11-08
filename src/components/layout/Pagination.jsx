import React from 'react'

export const Pagination = ({ activePage, setActivePage, lastPage, urlBase, loading }) => {

    const handleFirstPage = (e) => {
        e.preventDefault()
        setActivePage(1)
        loading(true)
    }

    const handlePrevPage = (e) => {
        e.preventDefault()
        setActivePage(activePage - 1)
        loading(true)
    }

    const handleNextPage = (e) => {
        e.preventDefault()
        setActivePage(activePage + 1)
        loading(true)
    }

    const handleLastPage = (e) => {
        e.preventDefault()
        setActivePage(lastPage)
        loading(true)
    }

    return (
        <div className="pagination__container">
            {
                activePage > 1 && (
                    <>
                        <button onClick={handlePrevPage}>
                            <span class="material-symbols-rounded">
                                keyboard_double_arrow_left
                            </span>
                        </button>
                        <button onClick={handlePrevPage}>
                            <span class="material-symbols-rounded">
                                navigate_before
                            </span>
                        </button>
                    </>
                )
            }

            {
                activePage < lastPage && (
                    <>
                        <button onClick={handleNextPage}>
                            <span class="material-symbols-rounded">
                                navigate_next
                            </span>
                        </button>
                        <button onClick={handleLastPage}>
                            <span class="material-symbols-rounded">
                                double_arrow
                            </span>
                        </button>
                    </>
                )
            }


        </div>
    )
}
