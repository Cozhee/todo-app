export default function Header({ incomplete }) {
    return (
        <header>
            <h1>To Do List: {incomplete} items pending</h1>
        </header>
    )
}