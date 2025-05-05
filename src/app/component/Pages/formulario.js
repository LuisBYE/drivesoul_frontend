export default function FuncionesAdminForm(
    {
        imputValue = [{}],
        onChange = () => { },
        onSubmit = () => { },
        onClick = () => { },
        typeText = "text",
        typeEmail = "email",
        typePassword = "password",
        style = {},
        options = [],
        titleButton = "Enviar",
        display = "",
        titlePage = "Formulario",
    }
) {

    return (
        <>

            <div className="form-container" >
                <h1 >{titlePage}</h1>
                {imputValue.map((input, index) => {
                    const inputType = input === "password" ? typePassword : typeText;
                    return (
                        <div key={index}>
                            <label>{input}</label>
                            <input type={inputType} placeholder={input} />
                        </div>
                    );
                })}
                {options.length > 0 &&
                    <select name="opciones" >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                }
                <button
                    type="submit"
                    onClick={onClick}
                    style={style}
                    className="styled-button"
                >{titleButton}</button>
            </div>
            <style jsx>{`
                .form-container {
                    display: ${display.length > 0 ? display : "flex"};
                    flex-direction: column;
                    gap: 10px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .form-container label {
                    font-size: 1.2rem;
                    color: #333;
                }
                .form-container input, .form-container select {
                    padding: 10px;
                    font-size: 1rem;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                }
                     .styled-button {
        background-color: #007BFF; /* Azul primario */
        color: #fff; /* Texto blanco */
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .styled-button:hover {
        background-color: #0056b3; /* Azul más oscuro */
        transform: translateY(-2px); /* Efecto de elevación */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }

    .styled-button:active {
        background-color: #004085; /* Azul aún más oscuro */
        transform: translateY(0); /* Sin elevación */
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    }
            `}</style>

        </>
    )
}
