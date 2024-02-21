import React, { useRef } from "react";
import emailjs from "\index"


export default function ContactForm() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_x6p3df2",
            "template_gsr5uus",
            form.current,
            "IkkjdETjR32xscfXV"
        ).then(
            result => console.log(result.text),
            error => console.log(error.text)
        );
    };

    return (
        <div class="container">
            <div class="row">
                <div class="col align-self-center">
                    <h1 class="text-center">Email - JavaScript Contact Form</h1>

                    {/* <!-- contact form --> */}
                    <form ref={form} onSubmit={sendEmail }>
                        {/* <!-- name --> */}
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="name" name="name" class="form-control" id="name" placeholder="Name" required/>
                        </div>

                        {/* <!-- email --> */}
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" name="email" class="form-control" id="email" placeholder="Email" required/>
                        </div>

                        {/* <!-- subject --> */}
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" name="subject" class="form-control" id="subject" placeholder="Subject" required />
                        </div>

                        <div class="form-group">
                            <label for="email_body">Message</label>
                            <textarea class="form-control" id="email_body" rows="5" required></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}