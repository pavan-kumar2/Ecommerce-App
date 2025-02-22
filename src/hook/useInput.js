export const useInput = (value, setValue) => {

    const bind = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [bind]
}