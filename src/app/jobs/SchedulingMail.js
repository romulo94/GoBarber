import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SchedulingMail {
  get key() {
    return 'SchedulingMail';
  }

  async handle({ data }) {
    const { user, provider, date } = data;

    await Mail.sendMail({
      to: `${provider.name} <${provider.email}>`,
      subject: 'Novo agendamento',
      template: 'scheduling',
      context: {
        provider: provider.name,
        user: user.name,
        date: format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SchedulingMail();
