const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => {
    const total = sum.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <p>total of {total} exercises</p>
    );
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={course.parts} />
        </div>
    );
};

export default Course