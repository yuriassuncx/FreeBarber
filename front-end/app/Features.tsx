import { Checks } from 'phosphor-react';

const features = [
  {
    name: 'Inclusão de membros',
    description: 'Você poderá adicionar mais de um membro para a sua barbearia e ter mais possibilidades de agendamento.',
  },
  {
    name: 'Notificações',
    description: 'Nossa aplicação disponibiliza notificações para você ficar ligado nas novidades.',
  },
  {
    name: 'Dashboard',
    description: 'A barbearia terá um registro de todos os agendamentos recebidos durante o mês.',
  },
  {
    name: 'Boas práticas',
    description: 'Desenvolvemos o site com as melhores práticas de negócios atuais.',
  },
  {
    name: 'Simples uso',
    description: 'A aplicação conta com tutoriais para qualquer pessoa conseguir utilizar.',
  },
  {
    name: 'Reportar',
    description: 'Em caso de má conduta, você poderá reportar alguma barbearia e, assim, poderemos removê-la.',
  },
  {
    name: 'Agendamento',
    description: 'Com uma conta criada, você conseguirá agendar seu corte de cabelo ideal.',
  },
  {
    name: 'Responsivo',
    description: 'Para a acessibilidade de todos, garantimos a responsividade da aplicação.',
  },
]

export function Features() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Tudo em uma plataforma</h2>
          <p className="mt-4 text-lg text-gray-500">
            Construímos uma aplicação para entregar o máximo de acessibilidade aos usuários. Altamente elegante ao público e com um suporte de rápido atendimento.
          </p>
        </div>
        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <Checks className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                <p className="ml-9 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
