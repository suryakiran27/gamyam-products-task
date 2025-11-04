export const NoDatFound = ({ message }: { message: string }) => {
    return <div className="no-data-found border-shadow">
        <h3>{message}</h3>
    </div>
}