import React,
{ useState } from "react";

export default function Account() {
    const [ editing, setEditing ] = useState(false);
    const [ firstName, setFirstName ] = useState("Lydia");
    const [lastName, setLastName] = useState("Dames");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                setEditing(!editing);
            }}
        >

            <p>
                <i>
                    Hello, {firstName} {lastName}!
                </i>
            </p>

            <label>
                First Name: {" "}
                {editing ? (
                    <input
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                ) : (
                    <b>{firstName}</b>
                )}
            </label>

            <span>
                <br />
            </span>


            <label>
                Last Name: {" "}
                {editing ? (
                    <input
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                ) : (
                    <b>{lastName}</b>
                )}
            </label>

            <span>
                <br />
                <br />
            </span>

            <button type="submit">{editing ? "Save" : "Edit"} Profile </button>

        </form>
    );
}