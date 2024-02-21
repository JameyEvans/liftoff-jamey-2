import React, { useRef } from "react";
import emailjs from "@emailjs/browser";


export default function ContactForm() {
    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_b4qmiqc",
                "template_h9rzd14",
                form.current,
                "user_UHpNJFij8MtQD1aAfs38X"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert("Your email has been sent.");
                },
                (error) => {
                    console.log(error.text);
                    alert("Your email failed to send.", error);
                }
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