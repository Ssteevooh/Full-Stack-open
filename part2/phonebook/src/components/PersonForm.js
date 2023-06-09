const PersonForm = ({
    addPerson,
    newName,
    handleNameChange,
    newPhonenumber,
    handlePhonenumberChange
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange} />
            </div>
            <div>
                number: <input
                    value={newPhonenumber}
                    onChange={handlePhonenumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;