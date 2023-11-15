
const GoalsData = () => {
    return (
        <div className="container flex justify-between gap-8">
            <span className="container__identifier">A</span>
            <div className="container__inner flex justify-between w-full">
                <p>Goal 1</p>
                <div className="container__inner-button flex gap-8">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default GoalsData