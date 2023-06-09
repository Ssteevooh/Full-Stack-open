const Person = ({ person, deltePerson }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            deltePerson(person.id);
        }
    };

    return (
        <div>
            {person.name} {person.phonenumber}
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

const Persons = ({ persons, searchName, deltePerson }) => {
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

    return (
        <div>
            {filterPersons.map(person => <Person person={person} deltePerson={deltePerson} key={person.id} />)}
        </div>
    );
};

export default Persons;