'use client';

import { useConfiguracion } from '../../hooks/useConfiguracion';

export default function ConfiguracionForm() {
  const { valores, setValores, guardar } = useConfiguracion();

  const handleToggleGrises = async () => {
    const nuevo = !valores.modoGrises;
    setValores((prev) => ({ ...prev, modoGrises: nuevo }));
    await guardar('modoGrises', JSON.stringify(nuevo));
  };

  const handleToggleContraste = async () => {
    const nuevo = !valores.modoContraste;
    setValores((prev) => ({ ...prev, modoContraste: nuevo }));
    await guardar('modoContraste', JSON.stringify(nuevo));
  };

  const handleTextoChange = async (valor) => {
    const porcentaje = parseInt(valor);
    setValores((prev) => ({ ...prev, tamanoTexto: porcentaje }));
    await guardar('tamanoTexto', porcentaje);
  };

  const handleTipografiaChange = async (valor) => {
    setValores((prev) => ({ ...prev, tipografia: valor }));
    await guardar('tipografia', JSON.stringify(valor));
  };

  const fuentes = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Nunito',
    'Merriweather',
    'Playfair Display',
    'Source Sans Pro',
  ];

  return (
    <div className="space-y-6 p-4 max-w-md mx-auto">
      {/* Escala de grises */}
      <div>
        <label className="block mb-2 font-semibold">Escala de grises global</label>
        <button
          onClick={handleToggleGrises}
          className={`px-4 py-2 rounded transition ${
            valores.modoGrises ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {valores.modoGrises ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      {/* Contraste */}
      <div>
        <label className="block mb-2 font-semibold">Modo alto contraste</label>
        <button
          onClick={handleToggleContraste}
          className={`px-4 py-2 rounded transition ${
            valores.modoContraste ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'
          }`}
        >
          {valores.modoContraste ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      {/* Tamaño de texto */}
      <div>
        <label className="block mb-2 font-semibold">
          Tamaño de texto: {valores.tamanoTexto}%
        </label>
        <input
          type="range"
          min="50"
          max="150"
          step="5"
          value={valores.tamanoTexto}
          onChange={(e) => handleTextoChange(e.target.value)}
          className="w-full cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Pequeño</span>
          <span>Predeterminado</span>
          <span>Grande</span>
        </div>
      </div>

      {/* Tipografía global */}
      <div>
        <label className="block mb-2 font-semibold">Tipografía global</label>
        <select
          value={valores.tipografia}
          onChange={(e) => handleTipografiaChange(e.target.value)}
          className="w-full border rounded p-2 cursor-pointer"
          style={{ fontFamily: valores.tipografia }}
        >
          {fuentes.map((fuente) => (
            <option
              key={fuente}
              value={fuente}
              style={{ fontFamily: fuente }}
            >
              {fuente}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
