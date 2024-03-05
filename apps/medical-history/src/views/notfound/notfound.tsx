

const NotFound = () => {

    return (
        <div className="not-found-container">

            <img
                src="../assets/Medicare-sin-fondo.png"
                alt="Logo"
                style={{ width: '400px', height: 'auto' }} // Ajusta el tamaño aquí
            />

            <img
                src="../assets/robotNotFound.png"
                alt="Logo"
                style={{ width: '200px', height: 'auto' }} // Ajusta el tamaño aquí
            />
            <h2 className="not-found-title"> 404 Ruta no encontrada</h2>

        </div>
    )

}

export default NotFound;