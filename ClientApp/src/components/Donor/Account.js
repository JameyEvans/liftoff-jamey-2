import React,
{
    useEffect,
    useState
} from "react";

export default function Account() {
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const response = await fetch("api/donor/FindLoggedInDonor");
        if (!response.ok) {
            // handle the error
            // set isError to true and update your error handling logic
            setIsError(true);
            console.error('Error fetching user data:', response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Received user data:', data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDataLoaded(true);
    }

    const setUserData = async () => {
        const response = await fetch("api/donor/Account", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
            }),
        });
        if (!response.ok) {
            // handle the error
            // set isError to true and update your error handling logic
        }
        const data = await response.json();
        console.log(data);
    }

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