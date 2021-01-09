import { EventInstance, EventName } from "../structures/Event";
import { Langs } from "../structures/NewClient";

/* Inicios de funcoes e seus significados; */
// t: Textos que vão para terminal!

export function t001(lang: Langs, eventInstance: EventInstance, eventName: EventName<EventInstance>) {
  switch (lang) {
    case 'en-us':
      return `> ${eventName} event loaded successfully! (${eventInstance})`;
    case 'pt-br':
      return `> Evento ${eventName} carregado com sucesso! (${eventInstance})`;
  };
};