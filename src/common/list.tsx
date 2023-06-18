import React, { ReactNode } from 'react'
import Card from './card'

interface Props {
    children: ReactNode
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    className?: string
}

export default function ListItem(props: Props) {
    return (
        <div className={`activity-list-entries ${props.className || ""}`} onClick={props.onClick && props.onClick}>
            <Card className='list-entity'>
                {props.children}
            </Card>
        </div>
    )
}
