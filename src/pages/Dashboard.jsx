import AppLayout from "../components/layout"
import { Route, Routes } from "react-router-dom"
import {
    CancellationsList,
    ClientList,
    ClientNew,
    CotizacionesList,
    Inicio,
    SalesList,
    SingleCancellations,
    SingleClient,
    SingleCotizacion,
    SingleSales
} from "./index"

export const Dashboard = () => {
    return (
        <AppLayout>
            <Routes>
                {/* Inicio del Dashboard */}
                <Route path="/" element={<Inicio />} />

                {/* Clientes */}
                <Route path="/clientes" element={<ClientList />} />
                <Route path="/clientes/nuevo" element={<ClientNew />} />
                <Route path="/clientes/:id" element={<SingleClient />} />

                {/* Cotizaciones */}
                <Route path="/cotizaciones" element={<CotizacionesList />} />
                <Route path="/cotizaciones/:id" element={<SingleCotizacion />} />

                {/* Notas de Ventas */}
                <Route path="/notas-ventas" element={<SalesList />} />
                <Route path="/notas-ventas/:id" element={<SingleSales />} />

                {/* Notas Canceladas */}
                <Route path="/notas-canceladas" element={<CancellationsList />} />
                <Route path="/notas-canceladas/:id" element={<SingleCancellations />} />

                {/* <Route path="/" element={} /> */}
            </Routes>
        </AppLayout>
    )
}
