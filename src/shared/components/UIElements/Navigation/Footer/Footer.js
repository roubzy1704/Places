import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="Footer">
			<p>
				2020 <i className="fas fa-code"></i> by{" "}
				<a
					href="https://www.ugoarubaleze.com"
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: "none" }}
				>
					<span className="myName">Ugo Arubaleze</span>
				</a>
			</p>
		</div>
	);
};

export default Footer;
