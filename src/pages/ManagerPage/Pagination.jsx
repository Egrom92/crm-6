import React, {useState, useEffect } from 'react'


export default function Pagination({count, limit, query, onPageChange}) {

    const [activePage, setActivePage] = useState( '');

    const pagination = []

    const numberOfPages = count / limit;

    useEffect(()=> {
        onPageChange(activePage)
    },[activePage, onPageChange])


    // for (let i = 1; i <= numberOfPages; i++) {
    //     console.log(i)
    //     pagination.push(
    //         <li key={i} className="page-item">
    //             <a
    //                 onClick={setActivePage(numberOfPages)}
    //                 className="page-link"
    //             >{i}</a>
    //         </li>
    //     )
    // }


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li key={1} className="page-item">
                    <a
                        onClick={setActivePage(1)}
                        className="page-link"
                    >{1}</a>
                </li>
                <li key={2} className="page-item">
                    <a
                        onClick={setActivePage(2)}
                        className="page-link"
                    >{2}</a>
                </li>
                <li key={3} className="page-item">
                    <a
                        onClick={setActivePage(3)}
                        className="page-link"
                    >{3}</a>
                </li>
                <li key={4} className="page-item">
                    <a
                        onClick={setActivePage(4)}
                        className="page-link"
                    >{4}</a>
                </li>
            </ul>
        </nav>
    )
}