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

            <button type="submit">{editing ? "Save" : "Edit"} Profile </button>
            <p>
                <i>
                    Hello, {firstName} {lastName}!
                </i>
            </p>
        </form>
    );
}