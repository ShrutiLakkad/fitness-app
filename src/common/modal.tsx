import React, { ReactNode } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
    show: boolean
    onHide: () => void
    children: ReactNode
    title?: string
    hideFooter?: boolean
    hideHeader?: boolean
}

export default function CustomModal(props: Props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {!props.hideHeader && (
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title || "Title"}
                    </Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {!props.hideFooter && (
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            )}
        </Modal>
    )
}
