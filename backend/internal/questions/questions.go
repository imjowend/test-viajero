package questions

import "github.com/imjowend/test-viajero/backend/internal/models"

// FindByID busca una pregunta por su ID. Devuelve nil si no existe.
func FindByID(id int) *models.Question {
	for i := range Questions {
		if Questions[i].ID == id {
			return &Questions[i]
		}
	}
	return nil
}

// FindOption busca una opción dentro de una pregunta por su ID. Devuelve nil si no existe.
func FindOption(q *models.Question, optionID string) *models.Option {
	for i := range q.Options {
		if q.Options[i].ID == optionID {
			return &q.Options[i]
		}
	}
	return nil
}

// Questions es la fuente de verdad de las 24 preguntas del quiz.
// El backend valida todas las respuestas contra este slice.
var Questions = []models.Question{
	{
		ID:    1,
		Title: "El ataque de Soroche (Mal de altura)",
		Text:  "Llegamos a Cusco y a la mitad del grupo le da soroche intenso. ¿Qué hacés?",
		Options: []models.Option{
			{ID: "A", Text: "Me tomo una pastilla rápido, no podemos atrasar el itinerario.", Profile: "llama_trekker"},
			{ID: "B", Text: "Compro hojas de coca en el mercado, es lo más barato, natural y local.", Profile: "zorro_andino"},
			{ID: "C", Text: "Pido oxígeno en la recepción del hotel y pido delivery de comida para no salir.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Aprovecho para dormir todo el día tapado hasta la cabeza, cero estrés.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    2,
		Title: "Lluvia inesperada en la montaña",
		Text:  "Estamos a punto de empezar una caminata y empieza a llover a cántaros.",
		Options: []models.Option{
			{ID: "A", Text: "Me pongo mi poncho impermeable y subo igual, a eso vinimos.", Profile: "llama_trekker"},
			{ID: "B", Text: "Busco el techo más cercano para no mojarme, no voy a gastar en ponchos sobrevalorados.", Profile: "zorro_andino"},
			{ID: "C", Text: "Propongo cancelar y mejor nos vamos a tomar un chocolate caliente a un buen café.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me da igual, si la mayoría sube, subo; si no, me quedo viendo la lluvia.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    3,
		Title: "Drama en la estación de tren",
		Text:  "Faltan 15 minutos para que salga el tren y dos del grupo no aparecen.",
		Options: []models.Option{
			{ID: "A", Text: "Me subo al tren. Les aviso que los veo allá, no me voy a perder las ruinas.", Profile: "llama_trekker"},
			{ID: "B", Text: "Los llamo desesperado para que corran, ¡esos pasajes costaron caros y no hay devolución!", Profile: "zorro_andino"},
			{ID: "C", Text: "Hablo con el personal a ver si nos pueden cambiar a un tren más tarde pagando una penalidad.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me siento a esperar, seguro llegan. Si lo perdemos, ya ni modo, fluimos.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    4,
		Title: "El dilema del equipaje de mano",
		Text:  "Viajamos solo con equipaje de mano. Ves una chompa de alpaca hermosa pero gigante que ocupa media maleta.",
		Options: []models.Option{
			{ID: "A", Text: "No la compro, prefiero llevarme recuerdos en fotos e imanes pequeños para no cargar.", Profile: "llama_trekker"},
			{ID: "B", Text: "Busco una parecida pero más pequeña en el mercado de San Pedro.", Profile: "zorro_andino"},
			{ID: "C", Text: "La compro y pago el exceso de equipaje en el aeropuerto sin pensarlo.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me la pongo encima de toda mi ropa para subir al avión, problema resuelto.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    5,
		Title: "La cuenta de la cena",
		Text:  "Fuimos a comer los 8 juntos a un restaurante local. A la hora de pagar...",
		Options: []models.Option{
			{ID: "A", Text: "Divido la cuenta en 8 partes iguales rápido para seguir con el itinerario de la noche.", Profile: "llama_trekker"},
			{ID: "B", Text: "Saco la calculadora: yo solo comí una empanada y tomé agua, pago exactamente lo mío.", Profile: "zorro_andino"},
			{ID: "C", Text: "Pongo mi tarjeta de crédito para ganar los puntos/millas y que me transfieran después.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Dejo billetes de más en la mesa y que alguien más se encargue de las matemáticas.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    6,
		Title: "El guía aburrido",
		Text:  "Estamos en un tour y el guía habla súper lento y aburrido.",
		Options: []models.Option{
			{ID: "A", Text: "Me quedo escuchando atento y tomando notas, quiero aprender la historia.", Profile: "llama_trekker"},
			{ID: "B", Text: "Me separo disimuladamente y recorro el lugar por mi cuenta usando Google Maps.", Profile: "zorro_andino"},
			{ID: "C", Text: "Le pregunto dónde hay un baño decente y me voy a la cafetería a esperar.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me siento en una piedra a tomar el sol y descansar hasta que termine de hablar.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    7,
		Title: "Emergencia en el Valle Sagrado",
		Text:  "En plena caminata por la naturaleza te urge ir al baño y solo hay campo.",
		Options: []models.Option{
			{ID: "A", Text: "Voy detrás de un arbusto rápido para no retrasar al grupo.", Profile: "llama_trekker"},
			{ID: "B", Text: "Uso la naturaleza feliz de la vida, así es la aventura real.", Profile: "zorro_andino"},
			{ID: "C", Text: "Me aguanto el tiempo que sea necesario hasta encontrar un restaurante con baño limpio.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me frustro un poco pero lo hago, quejándome de que esto es demasiado 'salvaje'.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    8,
		Title: "Fotografía extrema",
		Text:  "Hay un mirador increíble en Cusco pero hay que hacer una fila de 40 minutos para la foto grupal.",
		Options: []models.Option{
			{ID: "A", Text: "No hago fila, tomo una foto del paisaje general y sigo explorando.", Profile: "llama_trekker"},
			{ID: "B", Text: "Hago la fila y aprovecho para comerme un snack económico que traje en mi mochila.", Profile: "zorro_andino"},
			{ID: "C", Text: "Le pago a uno de los fotógrafos locales para saltarme la fila y tener una foto profesional.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me siento a un lado a descansar mientras los demás hacen la fila por mí.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    9,
		Title: "La tentación callejera",
		Text:  "Hay un puesto en la calle con choclo con queso que huele increíble, pero el nivel de higiene es dudoso.",
		Options: []models.Option{
			{ID: "A", Text: "Pruebo un poco rápido, pero prefiero no arriesgarme a enfermarme antes de los tours.", Profile: "llama_trekker"},
			{ID: "B", Text: "Compro dos porciones, es comida local y el almuerzo más barato que encontraremos.", Profile: "zorro_andino"},
			{ID: "C", Text: "Paso de largo, mejor buscamos ese mismo plato en un restaurante bonito de la ciudad.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Le pido a un amigo que compre y le robo un bocado para no quedarme con las ganas.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    10,
		Title: "La madrugada fallida",
		Text:  "Quedamos a las 5:00 AM para un tour. Son las 5:15 AM y nadie más ha salido de su cama.",
		Options: []models.Option{
			{ID: "A", Text: "Empiezo a tocar todas las puertas. ¡El itinerario no se respeta solo!", Profile: "llama_trekker"},
			{ID: "B", Text: "Salgo a caminar yo solo por los alrededores para no perder mi mañana de exploración.", Profile: "zorro_andino"},
			{ID: "C", Text: "Vuelvo a mi habitación privada feliz de la vida y pido un buen desayuno más tarde.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Era mi sueño hecho realidad, mi alarma nunca sonó de todas formas.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    11,
		Title: "Choque de intereses",
		Text:  "Dos amigos empiezan a discutir porque uno quiere ir a un museo y otro a comprar artesanías de plata.",
		Options: []models.Option{
			{ID: "A", Text: "Intervengo y busco un lugar cercano que tenga ambas cosas para no perder tiempo.", Profile: "llama_trekker"},
			{ID: "B", Text: "Los dejo discutir y me voy al mercado más barato a hacer mis propias compras.", Profile: "zorro_andino"},
			{ID: "C", Text: "Propongo separarnos: unos al museo, otros de compras, y nos vemos en la cena.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me pongo mis audífonos y espero a que decidan sin opinar, me da igual.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    12,
		Title: "Cusco exige pulmones",
		Text:  "Llevamos 3 días caminando sin parar y te duelen los pies como nunca.",
		Options: []models.Option{
			{ID: "A", Text: "Me pongo vendas, tomo un analgésico y sigo con nivel chasqui.", Profile: "llama_trekker"},
			{ID: "B", Text: "Me aguanto el dolor, no quiero pagar un taxi si podemos llegar caminando.", Profile: "zorro_andino"},
			{ID: "C", Text: "Mañana pago un tour privado en minivan que nos deje en la puerta de todo.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Declaro mañana 'día de descanso grupal' y exijo nivel relax total.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    13,
		Title: "Las señoras con llamas",
		Text:  "Vemos unas mujeres locales con alpacas y llamas cobrando por tomarse fotos con ellas.",
		Options: []models.Option{
			{ID: "A", Text: "Tomo una foto cultural del momento desde lejos para documentar.", Profile: "llama_trekker"},
			{ID: "B", Text: "Tomo la foto rápido desde otro ángulo para no pagar, modo ahorro extremo.", Profile: "zorro_andino"},
			{ID: "C", Text: "Les doy un buen billete y me tomo una sesión completa abrazando a los animales.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Las miro de lejitos, me da pereza acercarme y negociar el precio.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    14,
		Title: "Fiesta vs. Responsabilidad",
		Text:  "Son las 2:00 AM, la fiesta en la Plaza de Armas está increíble, pero mañana hay tour a las 7:00 AM.",
		Options: []models.Option{
			{ID: "A", Text: "Me voy a dormir inmediatamente. No voy a hacer el tour cansado.", Profile: "llama_trekker"},
			{ID: "B", Text: "Sigo en la fiesta. Mañana duermo en el bus del tour y no gasto en taxi de madrugada.", Profile: "zorro_andino"},
			{ID: "C", Text: "Me voy al hotel a descansar bien para estar presentable en las fotos de mañana.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me quedo en la fiesta y mañana simplemente no voy al tour, estoy de vacaciones.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    15,
		Title: "Perdidos en San Blas",
		Text:  "Nos perdimos buscando una calle empedrada en el barrio de San Blas de noche.",
		Options: []models.Option{
			{ID: "A", Text: "Saco el mapa, pregunto a los locales y lidero el camino de regreso.", Profile: "llama_trekker"},
			{ID: "B", Text: "Uso el celular y nos guío caminando para no gastar en transporte.", Profile: "zorro_andino"},
			{ID: "C", Text: "Busco un taxi seguro inmediatamente, no quiero caminar subidas de noche.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Entro al primer bar que veo, nos tomamos un pisco sour y luego averiguamos cómo volver.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    16,
		Title: "Tarde 100% libre",
		Text:  "Tenemos 4 horas libres sin nada planeado antes de la cena.",
		Options: []models.Option{
			{ID: "A", Text: "Busco en internet qué templo arqueológico cercano podemos visitar en ese tiempo.", Profile: "llama_trekker"},
			{ID: "B", Text: "Me voy a caminar por los mercados menos turísticos para ver cómo vive la gente.", Profile: "zorro_andino"},
			{ID: "C", Text: "Busco el balcón con la mejor vista, pido algo de tomar y me relajo.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Regreso al hotel a tomar una siesta reparadora, me la merezco.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    17,
		Title: "Desconexión digital",
		Text:  "El internet de todo Cusco se cae y no hay señal en los celulares por un día entero.",
		Options: []models.Option{
			{ID: "A", Text: "Saco mis apuntes impresos para no atrasar la logística de los tours.", Profile: "llama_trekker"},
			{ID: "B", Text: "¡Genial! Desconexión total. Me voy a la plaza a conversar con otros mochileros.", Profile: "zorro_andino"},
			{ID: "C", Text: "Me frustro porque no puedo subir historias, y busco el hotel más lujoso a ver si tienen red.", Profile: "vicuna_vip"},
			{ID: "D", Text: "La excusa perfecta para no responder mensajes del trabajo y vivir el momento.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    18,
		Title: "Gastronomía intensa: El Cuy",
		Text:  "Nos sirven Cuy (conejillo de indias) en un restaurante tradicional.",
		Options: []models.Option{
			{ID: "A", Text: "Pruebo un pedazo pequeño para conocer la cultura gastronómica y sigo.", Profile: "llama_trekker"},
			{ID: "B", Text: "Me lo como entero, es una experiencia súper local que hay que vivir al 100%.", Profile: "zorro_andino"},
			{ID: "C", Text: "No gracias, le tomo foto y pido un lomo saltado clásico.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Solo me como las papas y el choclo que lo acompañan para no hacer problema.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    19,
		Title: "El estrés del último día",
		Text:  "Toca armar el equipaje de mano para regresar y la maleta no cierra por las compras.",
		Options: []models.Option{
			{ID: "A", Text: "Saco todo, organizo milimétricamente hasta que cierre perfecto.", Profile: "llama_trekker"},
			{ID: "B", Text: "Dejo la ropa más vieja que traje en el hostal para liberar espacio y no pagar exceso.", Profile: "zorro_andino"},
			{ID: "C", Text: "Pago la tarifa de equipaje en bodega desde el celular sin estresarme por el peso.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Le pido a un amigo que se siente encima de mi maleta mientras yo jalo el cierre a la fuerza.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    20,
		Title: "La despedida de Cusco",
		Text:  "Es nuestra última noche en la ciudad y hay presupuesto sobrante. ¿Cómo cerramos el viaje?",
		Options: []models.Option{
			{ID: "A", Text: "Caminata final por la Plaza de Armas para absorber la energía del lugar.", Profile: "llama_trekker"},
			{ID: "B", Text: "Compramos cervezas en el supermercado y brindamos en el alojamiento.", Profile: "zorro_andino"},
			{ID: "C", Text: "Si hay un 'lujito grupal', reservamos una cena increíble en el restaurante más famoso.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Cenamos cualquier cosa cerca y nos vamos a dormir temprano, que el aeropuerto cansa.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    21,
		Title: "El Tesorero del Grupo",
		Text:  "Hay que llevar un control de los gastos compartidos (taxis, snacks, propinas). ¿Cuál es tu rol ideal?",
		Options: []models.Option{
			{ID: "A", Text: "Descargo una app como Splitwise y registro los gastos al segundo para que todo sea justo.", Profile: "llama_trekker"},
			{ID: "B", Text: "Me ofrezco a llevar las cuentas de cerca para asegurarme de que nadie gaste de más.", Profile: "zorro_andino"},
			{ID: "C", Text: "Pongo mi tarjeta de crédito para los montos grandes y gano las millas/puntos.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Prefiero que otro sea el tesorero. Yo solo transfiero lo que me digan al final del día.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    22,
		Title: "Estrategia de Ahorro y Presupuesto",
		Text:  "¿Cómo preparaste tu billetera para este viaje a Cusco?",
		Options: []models.Option{
			{ID: "A", Text: "Pagué todos los tickets pesados con meses de anticipación para no pensar en dinero allá.", Profile: "llama_trekker"},
			{ID: "B", Text: "Armé un presupuesto diario estricto y mi meta es no pasarme ni un sol.", Profile: "zorro_andino"},
			{ID: "C", Text: "Ahorré un fondo extra exclusivamente para darme gustitos: masaje, restaurante top, recuerdo exclusivo.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Vi cuánto tenía en la cuenta y me mandé. Gastaré según lo que vaya surgiendo.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    23,
		Title: "El Fondo Común (La Chanchita)",
		Text:  "Armamos un pozo de dinero en efectivo para pagos rápidos grupales. ¿Cómo manejás tu parte?",
		Options: []models.Option{
			{ID: "A", Text: "Me ofrezco a guardarlo yo para pagar rápido los tickets y taxis sin retrasar el itinerario.", Profile: "llama_trekker"},
			{ID: "B", Text: "Doy mi parte exacta, pero pido que se use estrictamente para cosas 100% grupales.", Profile: "zorro_andino"},
			{ID: "C", Text: "Pongo billetes grandes de una vez para no estar buscando sencillo a cada rato.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Me olvido de sacar efectivo. Le pido a un amigo que ponga mi parte y le transfiero desde el celular.", Profile: "oso_anteojos"},
		},
	},
	{
		ID:    24,
		Title: "El Imprevisto Financiero",
		Text:  "Un paro imprevisto nos obliga a tomar una ruta alterna que cuesta el doble de lo presupuestado.",
		Options: []models.Option{
			{ID: "A", Text: "Lo pago sin dudar. El tiempo vale oro y no voy a dejar que un paro arruine el itinerario.", Profile: "llama_trekker"},
			{ID: "B", Text: "Busco en Google Maps si hay colectivos locales más baratos o propongo caminar un tramo.", Profile: "zorro_andino"},
			{ID: "C", Text: "Ya que cuesta más, propongo agregar un poco más y alquilar una minivan privada cómoda.", Profile: "vicuna_vip"},
			{ID: "D", Text: "Pago lo que diga la mayoría y aprovecho la demora en la carretera para dormir una siesta.", Profile: "oso_anteojos"},
		},
	},
}
