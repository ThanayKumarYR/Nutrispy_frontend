import React, { useState } from 'react';
import { axios } from '../utilities';
import "./css/Contact.css";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '', email: '', number: '', company: '', message: '',
	});

	const [mess, setMess] = useState({
		status: "",
		message: ""
	});

	const handleChange = (e) => {
		if (e.target.name === "number") {
			setFormData({
				...formData,
				"number": e.target.value.substring(0, 10)
			})
			return
		}

		setFormData({
			...formData, [e.target.name]: e.target.value
		});

	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url = '/contact';
		axios.posting(url, formData)
			.then((response) => {
				console.log(response.data)
				if (response.data.response === "success") {
					setMess(() => ({
						message: 'Thanks for contacting. We will catch you soon!',
						status: "ok"
					})
					)
					setFormData({
						name: '', email: '', number: '', company: '', message: '',
					});
				}
				else {
					setMess(() => ({
						message: 'Oops! Something went wrong',
						status: "bad"
					})
					)
				}
			})
			.catch(e => {
				console.log(e);
				setMess(() => ({
					message: 'Oops! Something went wrong',
					status: "bad"
				})
				)
			})

		setTimeout(() => {
			setMess({
				status: "",
				message: ""
			})
		}, 5000);
	};

	return (
		<section className="container contact">
			<h1 className='title'>Send us a message</h1>
			<form className="contact-form" onSubmit={handleSubmit}>
				<div>
					<label>Name:</label>
					<input autoComplete='off' type="text" name="name" required value={formData.name} onChange={handleChange}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input autoComplete='off' type="email" pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/' name="email" required value={formData.email} onChange={handleChange}
					/>
				</div>
				<div>
					<label>Phone:</label>
					<input autoComplete='off' type="number" pattern="[6,7,8,9]{1}\d{9}" name="number" inputMode='numeric' required value={formData.number} onChange={handleChange}
					/>
				</div>
				<div>
					<label>Company (optional):</label>
					<input autoComplete='off' type="text" name="company" value={formData.company} onChange={handleChange}
					/>
				</div>
				<div>
					<label>Message:</label>
					<textarea
						autoComplete='off' name="message" rows="3" required value={formData.message} onChange={handleChange}
					/>
				</div>
				{mess.message ?
					<div className={`mess ${mess.status === "ok" ? "success" : "failure"}`}>
						{mess.message}
					</div>
					: ''}
				<button type="submit" disabled={mess.message ? true : false}>{mess.message ? "Submitting" : "Submit"}</button>
			</form>
		</section>
	);
};

export default Contact;
