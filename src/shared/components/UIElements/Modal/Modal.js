import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../BackDrop/BackDrop";
import "./Modal.css";

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<header className={`modal__header ${props.headerClass}`}>
				{/* form title */}
				<h2>{props.header}</h2>
			</header>
			<form
				onSubmit={
					props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
				}
			>
				<div className={`modal__content ${props.contentClass}`}>
					{/* will  hold form body */}
					{props.children}
				</div>
				<footer className={`modal__footer ${props.footerClass}`}>
					{/* will hold form action buttons */}
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
	return (
		// using the backdrop component to exit the modal
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal"
			>
				{/* forward all the props we get from outside to modalOverlay, which is the internal component we dont export, using the spread operator
			spreading the header, children, footer props*/}
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
