import { useEffect, type CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: 'auto',
    borderColor: "red",
};

export const Loader = ({ loading, setLoading }: spinnerProps) => {

    useEffect(() => {
        if (loading) setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    return <div className="no-data-found">
        <ClipLoader
            color={'green'}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}

type spinnerProps = {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}