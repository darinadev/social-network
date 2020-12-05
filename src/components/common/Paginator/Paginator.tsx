import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';
import { Button } from 'antd';

type PropsType = {
    totalItemsCount: number 
    pageSize: number 
    currentPage?: number 
    onPageChanged?: (pageNumber: number) => void 
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1, onPageChanged = () => {}, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.pages}>
        {
            portionNumber > 1 &&
            <Button className={styles.paginationControlPrevBtn} onClick={() => setPortionNumber(portionNumber - 1)}>Prev</Button>
        }
        {
            pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <span key={page} className={cn({[styles.selectedPage]:currentPage === page}, styles.pageNumber)}
                        onClick={() => onPageChanged(page)}>{page}</span>
                })
        }
        {
            portionNumber < portionCount &&
            <Button className={styles.paginationControlNextBtn} onClick={() => setPortionNumber(portionNumber + 1)}>Next</Button>
        }
    </div >
}

export default Paginator;