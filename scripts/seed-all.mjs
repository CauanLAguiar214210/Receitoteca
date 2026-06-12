import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'http://127.0.0.1:54321'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
const USER_ID = '00000000-0000-0000-0000-000000000001'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const recipes = [
  {
    title: 'Pão de Queijo',
    description: 'Pão de queijo mineiro tradicional, crocante por fora e macio por dentro.',
    ingredients: [{ name: 'Polvilho doce', amount: 500, unit: 'g' }, { name: 'Óleo', amount: 100, unit: 'ml' }, { name: 'Leite', amount: 200, unit: 'ml' }, { name: 'Ovos', amount: 2, unit: 'un' }, { name: 'Queijo minas meia cura ralado', amount: 300, unit: 'g' }, { name: 'Sal', amount: 1, unit: 'colher (chá)' }],
    instructions: ['Ferva o leite com o óleo e o sal.', 'Escalde o polvilho com essa mistura e misture bem.', 'Deixe esfriar e adicione os ovos, um a um, sovando a massa.', 'Acrescente o queijo ralado e misture até ficar homogêneo.', 'Faça bolinhas e disponha em uma assadeira untada.', 'Asse em forno preaquecido a 180°C por 25 minutos ou até dourar.'],
    prep_time: 15, cook_time: 25, servings: 6, difficulty: 'medium', category: 'Café da Manhã'
  },
  {
    title: 'Tapioca Recheada',
    description: 'Tapioca nordestina recheada com queijo coalho e coco.',
    ingredients: [{ name: 'Goma de tapioca', amount: 250, unit: 'g' }, { name: 'Queijo coalho ralado', amount: 150, unit: 'g' }, { name: 'Coco ralado', amount: 50, unit: 'g' }, { name: 'Manteiga', amount: 1, unit: 'colher (sopa)' }],
    instructions: ['Umedeça a goma de tapioca com um pouco de água e peneire.', 'Aqueça uma frigideira antiaderente em fogo médio.', 'Espalhe a goma na frigideira formando uma camada fina.', 'Quando firmar, vire a tapioca.', 'Recheie com o queijo coalho e o coco ralado.', 'Dobre ao meio e sirva quente.'],
    prep_time: 5, cook_time: 10, servings: 2, difficulty: 'easy', category: 'Café da Manhã'
  },
  {
    title: 'Feijoada Completa',
    description: 'Feijoada tradicional brasileira, perfeita para um almoço em família.',
    ingredients: [{ name: 'Feijão preto', amount: 500, unit: 'g' }, { name: 'Costelinha de porco salgada', amount: 300, unit: 'g' }, { name: 'Paio', amount: 2, unit: 'un' }, { name: 'Linguiça calabresa', amount: 2, unit: 'un' }, { name: 'Carne seca', amount: 200, unit: 'g' }, { name: 'Lombo de porco', amount: 200, unit: 'g' }, { name: 'Cebola', amount: 2, unit: 'un' }, { name: 'Alho', amount: 4, unit: 'dentes' }, { name: 'Louro', amount: 2, unit: 'folhas' }, { name: 'Arroz branco', amount: 300, unit: 'g' }],
    instructions: ['Deixe o feijão de molho por 12 horas. Dessalgue as carnes por 6 horas, trocando a água.', 'Cozinhe o feijão na panela de pressão por 30 minutos.', 'Em outra panela, refogue a cebola e o alho no azeite.', 'Adicione as carnes e frite bem.', 'Junte o feijão cozido com o caldo, as folhas de louro e cozinhe por mais 20 minutos em fogo baixo.', 'Acerte o sal e sirva com arroz branco, couve refogada e farofa.'],
    prep_time: 60, cook_time: 80, servings: 8, difficulty: 'hard', category: 'Almoço'
  },
  {
    title: 'Strogonoff de Frango',
    description: 'Strogonoff cremoso de frango, rápido e delicioso para o dia a dia.',
    ingredients: [{ name: 'Peito de frango cortado em cubos', amount: 500, unit: 'g' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 2, unit: 'dentes' }, { name: 'Manteiga', amount: 2, unit: 'colheres (sopa)' }, { name: 'Creme de leite', amount: 1, unit: 'lata' }, { name: 'Molho de tomate', amount: 3, unit: 'colheres (sopa)' }, { name: 'Mostarda', amount: 1, unit: 'colher (sopa)' }, { name: 'Arroz branco', amount: 300, unit: 'g' }, { name: 'Batata palha', amount: 100, unit: 'g' }],
    instructions: ['Tempere o frango com sal e pimenta.', 'Doure a cebola e o alho na manteiga.', 'Adicione o frango e frite até dourar.', 'Acrescente o molho de tomate e a mostarda, misture bem.', 'Baixe o fogo e adicione o creme de leite, mexendo sem ferver.', 'Sirva sobre arroz branco com batata palha por cima.'],
    prep_time: 10, cook_time: 25, servings: 4, difficulty: 'easy', category: 'Almoço'
  },
  {
    title: 'Frango Grelhado com Legumes',
    description: 'Refeição leve e saudável, perfeita para o almoço.',
    ingredients: [{ name: 'Peito de frango', amount: 400, unit: 'g' }, { name: 'Abobrinha', amount: 1, unit: 'un' }, { name: 'Pimentão', amount: 1, unit: 'un' }, { name: 'Cebola roxa', amount: 1, unit: 'un' }, { name: 'Azeite', amount: 3, unit: 'colheres (sopa)' }, { name: 'Limão', amount: 1, unit: 'un' }],
    instructions: ['Tempere o frango com suco de limão, sal e pimenta.', 'Corte os legumes em cubos grandes.', 'Aqueça uma grelha ou frigideira com azeite.', 'Grelhe o frango por 5 minutos de cada lado.', 'Na mesma frigideira, salteie os legumes por 5 minutos.', 'Sirva o frango fatiado acompanhado dos legumes.'],
    prep_time: 10, cook_time: 15, servings: 2, difficulty: 'easy', category: 'Almoço'
  },
  {
    title: 'Macarrão à Bolonhesa',
    description: 'Macarrão com molho bolonhesa caseiro, clássico e irresistível.',
    ingredients: [{ name: 'Macarrão espaguete', amount: 400, unit: 'g' }, { name: 'Carne moída', amount: 300, unit: 'g' }, { name: 'Molho de tomate', amount: 2, unit: 'xícaras' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 3, unit: 'dentes' }, { name: 'Azeite', amount: 2, unit: 'colheres (sopa)' }, { name: 'Queijo parmesão ralado', amount: 50, unit: 'g' }],
    instructions: ['Cozinhe o macarrão em água salgada até ficar al dente. Escorra e reserve.', 'Refogue a cebola e o alho no azeite.', 'Adicione a carne moída e cozinhe até dourar.', 'Acrescente o molho de tomate, tempere com sal e orégano, e deixe apurar por 10 minutos.', 'Misture o molho ao macarrão ou sirva por cima.', 'Finalize com queijo parmesão ralado.'],
    prep_time: 10, cook_time: 25, servings: 4, difficulty: 'easy', category: 'Massas'
  },
  {
    title: 'Lasanha à Bolonhesa',
    description: 'Lasanha de carne moída com camadas de molho e queijo, gratinada no forno.',
    ingredients: [{ name: 'Massa para lasanha', amount: 1, unit: 'pacote' }, { name: 'Carne moída', amount: 500, unit: 'g' }, { name: 'Molho de tomate', amount: 3, unit: 'xícaras' }, { name: 'Queijo mussarela fatiado', amount: 300, unit: 'g' }, { name: 'Presunto fatiado', amount: 200, unit: 'g' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 3, unit: 'dentes' }, { name: 'Leite', amount: 500, unit: 'ml' }, { name: 'Manteiga', amount: 2, unit: 'colheres (sopa)' }, { name: 'Farinha de trigo', amount: 2, unit: 'colheres (sopa)' }],
    instructions: ['Refogue a cebola e o alho, acrescente a carne moída e doure.', 'Adicione o molho de tomate e cozinhe por 10 minutos. Reserve.', 'Prepare o molho branco: derreta a manteiga, adicione a farinha, mexa bem e acrescente o leite aos poucos até engrossar.', 'Em um refratário, alterne camadas: molho bolonhesa, massa, presunto, mussarela e molho branco.', 'Repita as camadas até acabarem os ingredientes, finalizando com mussarela.', 'Leve ao forno preaquecido a 200°C por 25 minutos ou até dourar.'],
    prep_time: 30, cook_time: 45, servings: 8, difficulty: 'hard', category: 'Massas'
  },
  {
    title: 'Pudim de Leite Condensado',
    description: 'Pudim clássico brasileiro, cremoso e com calda de caramelo.',
    ingredients: [{ name: 'Leite condensado', amount: 1, unit: 'lata' }, { name: 'Leite', amount: 300, unit: 'ml' }, { name: 'Ovos', amount: 3, unit: 'un' }, { name: 'Açúcar', amount: 1, unit: 'xícara' }],
    instructions: ['Derreta o açúcar em uma panela até formar um caramelo dourado.', 'Despeje o caramelo em uma forma de pudim, espalhando nas laterais.', 'Bata no liquidificador o leite condensado, o leite e os ovos por 3 minutos.', 'Despeje a mistura na forma caramelada.', 'Cozinhe em banho-maria no forno a 180°C por 50 minutos.', 'Deixe esfriar e leve à geladeira por 4 horas antes de desenformar.'],
    prep_time: 10, cook_time: 50, servings: 8, difficulty: 'medium', category: 'Sobremesas'
  },
  {
    title: 'Brigadeiro',
    description: 'O doce brasileiro mais famoso, perfeito para festas e sobremesas.',
    ingredients: [{ name: 'Leite condensado', amount: 1, unit: 'lata' }, { name: 'Chocolate em pó', amount: 3, unit: 'colheres (sopa)' }, { name: 'Manteiga', amount: 1, unit: 'colher (sopa)' }, { name: 'Chocolate granulado', amount: 1, unit: 'xícara' }],
    instructions: ['Em uma panela, misture o leite condensado, o chocolate em pó e a manteiga.', 'Cozinhe em fogo baixo, mexendo sempre, até desgrudar do fundo (cerca de 10 minutos).', 'Despeje em um prato untado e deixe esfriar.', 'Com as mãos untadas, enrole bolinhas e passe no granulado.', 'Coloque em forminhas de papel e sirva.'],
    prep_time: 5, cook_time: 15, servings: 5, difficulty: 'easy', category: 'Sobremesas'
  },
  {
    title: 'Bolo de Cenoura com Cobertura',
    description: 'Bolo fofinho de cenoura com cobertura de chocolate, um clássico dos cafés.',
    ingredients: [{ name: 'Cenoura', amount: 3, unit: 'un' }, { name: 'Ovos', amount: 4, unit: 'un' }, { name: 'Óleo', amount: 1, unit: 'xícara' }, { name: 'Açúcar', amount: 2, unit: 'xícaras' }, { name: 'Farinha de trigo', amount: 2, unit: 'xícaras' }, { name: 'Fermento em pó', amount: 1, unit: 'colher (sopa)' }, { name: 'Chocolate em pó', amount: 3, unit: 'colheres (sopa)' }, { name: 'Manteiga', amount: 2, unit: 'colheres (sopa)' }, { name: 'Leite', amount: 3, unit: 'colheres (sopa)' }],
    instructions: ['Bata no liquidificador a cenoura picada, os ovos e o óleo.', 'Em uma tigela, misture o açúcar e a farinha. Adicione a mistura do liquidificador e mexa bem.', 'Acrescente o fermento e misture delicadamente.', 'Despeje em uma forma untada e enfarinhada.', 'Asse em forno preaquecido a 180°C por 40 minutos.', 'Para a cobertura: derreta a manteiga, o chocolate, o leite e o açúcar em fogo baixo até ferver. Espalhe sobre o bolo.'],
    prep_time: 15, cook_time: 40, servings: 10, difficulty: 'medium', category: 'Sobremesas'
  },
  {
    title: 'Coxinha de Frango',
    description: 'Salgado brasileiro clássico, massa cremosa recheada com frango catupiry.',
    ingredients: [{ name: 'Peito de frango', amount: 300, unit: 'g' }, { name: 'Caldo de galinha', amount: 1, unit: 'tablete' }, { name: 'Farinha de trigo', amount: 2, unit: 'xícaras' }, { name: 'Leite', amount: 1, unit: 'xícara' }, { name: 'Manteiga', amount: 2, unit: 'colheres (sopa)' }, { name: 'Catupiry', amount: 200, unit: 'g' }, { name: 'Farinha de rosca', amount: 1, unit: 'xícara' }, { name: 'Ovo', amount: 1, unit: 'un' }],
    instructions: ['Cozinhe o frango com o tablete de caldo até desfiar. Desfie e reserve.', 'Em outra panela, ferva o leite, a manteiga e 2 xícaras de água. Adicione a farinha de trigo de uma vez e mexa até formar uma massa homogênea.', 'Deixe a massa esfriar.', 'Misture o frango desfiado com o catupiry.', 'Abra porções da massa, recheie com o frango e modele em formato de coxinha.', 'Passe no ovo batido e na farinha de rosca. Frite em óleo quente até dourar.'],
    prep_time: 40, cook_time: 20, servings: 6, difficulty: 'hard', category: 'Lanches'
  },
  {
    title: 'Açaí na Tigela',
    description: 'Açaí cremoso acompanhado de granola, banana e mel, típico brasileiro.',
    ingredients: [{ name: 'Polpa de açaí', amount: 200, unit: 'g' }, { name: 'Banana', amount: 1, unit: 'un' }, { name: 'Granola', amount: 3, unit: 'colheres (sopa)' }, { name: 'Mel', amount: 1, unit: 'colher (sopa)' }, { name: 'Leite em pó', amount: 1, unit: 'colher (sopa)' }, { name: 'Morango', amount: 3, unit: 'un' }],
    instructions: ['Bata a polpa de açaí congelada com um pouco de água ou leite no liquidificador até ficar cremoso.', 'Despeje em uma tigela.', 'Corte a banana em rodelas e os morangos ao meio.', 'Decore com a fruta, granola, leite em pó e regue com mel.', 'Sirva imediatamente.'],
    prep_time: 5, cook_time: 0, servings: 1, difficulty: 'easy', category: 'Lanches'
  },
  {
    title: 'Salada Caesar',
    description: 'Salada Caesar clássica com molho cremoso, croutons e parmesão.',
    ingredients: [{ name: 'Alface americana', amount: 1, unit: 'un' }, { name: 'Peito de frango', amount: 200, unit: 'g' }, { name: 'Pão francês amanhecido', amount: 2, unit: 'un' }, { name: 'Queijo parmesão ralado', amount: 50, unit: 'g' }, { name: 'Maionese', amount: 3, unit: 'colheres (sopa)' }, { name: 'Mostarda', amount: 1, unit: 'colher (chá)' }, { name: 'Suco de limão', amount: 1, unit: 'colher (sopa)' }, { name: 'Azeite', amount: 2, unit: 'colheres (sopa)' }],
    instructions: ['Tempere o frango com sal e pimenta e grelhe até dourar dos dois lados. Corte em tiras.', 'Corte o pão em cubos, regue com azeite e leve ao forno até dourar (croutons).', 'Lave e rasgue as folhas de alface.', 'Prepare o molho: misture maionese, mostarda, suco de limão e metade do parmesão.', 'Monte a salada: alface, frango, croutons, molho e o restante do parmesão por cima.'],
    prep_time: 10, cook_time: 15, servings: 2, difficulty: 'easy', category: 'Saladas'
  },
  {
    title: 'Suco Verde Detox',
    description: 'Suco nutritivo e refrescante, ótimo para começar o dia.',
    ingredients: [{ name: 'Couve', amount: 2, unit: 'folhas' }, { name: 'Limão', amount: 1, unit: 'un' }, { name: 'Maçã verde', amount: 1, unit: 'un' }, { name: 'Gengibre', amount: 1, unit: 'pedaço pequeno' }, { name: 'Água de coco', amount: 200, unit: 'ml' }],
    instructions: ['Lave bem todos os ingredientes.', 'Corte a maçã em pedaços (com casca).', 'Bata tudo no liquidificador com a água de coco.', 'Coe se preferir e sirva gelado.'],
    prep_time: 5, cook_time: 0, servings: 1, difficulty: 'easy', category: 'Bebidas'
  },
  {
    title: 'Limonada Suíça',
    description: 'Limonada cremosa e refrescante feita com leite condensado.',
    ingredients: [{ name: 'Limão', amount: 3, unit: 'un' }, { name: 'Leite condensado', amount: 3, unit: 'colheres (sopa)' }, { name: 'Gelo', amount: 1, unit: 'xícara' }, { name: 'Água gelada', amount: 300, unit: 'ml' }],
    instructions: ['Lave bem os limões e corte as pontas.', 'Corte cada limão em 8 pedaços (com casca).', 'Bata tudo no liquidificador: limão, leite condensado, água e gelo.', 'Coe com uma peneira fina para tirar os resíduos da casca.', 'Sirva bem gelado.'],
    prep_time: 5, cook_time: 0, servings: 2, difficulty: 'easy', category: 'Bebidas'
  },
  {
    title: 'Caldo Verde',
    description: 'Caldo verde tradicional português, cremoso e perfeito para dias frios.',
    ingredients: [{ name: 'Batata', amount: 500, unit: 'g' }, { name: 'Couve', amount: 3, unit: 'folhas' }, { name: 'Linguiça calabresa', amount: 1, unit: 'un' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 2, unit: 'dentes' }, { name: 'Azeite', amount: 2, unit: 'colheres (sopa)' }],
    instructions: ['Descasque as batatas, corte em cubos e cozinhe em água com sal até amolecerem.', 'Bata as batatas com a água do cozimento no liquidificador até formar um creme liso.', 'Refogue a cebola e o alho no azeite.', 'Adicione a linguiça calabresa cortada em rodelas e frite.', 'Despeje o creme de batata na panela, misture e deixe ferver.', 'Corte a couve em tiras bem finas, adicione à sopa e cozinhe por 3 minutos. Acerte o sal e sirva.'],
    prep_time: 10, cook_time: 30, servings: 4, difficulty: 'medium', category: 'Sopas'
  },
  {
    title: 'Canja de Galinha',
    description: 'Canja caseira de galinha com arroz, legumes e muito sabor, remédio da vó.',
    ingredients: [{ name: 'Peito de frango', amount: 300, unit: 'g' }, { name: 'Arroz', amount: 1, unit: 'xícara' }, { name: 'Cenoura', amount: 1, unit: 'un' }, { name: 'Batata', amount: 1, unit: 'un' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 2, unit: 'dentes' }, { name: 'Cheiro-verde', amount: 1, unit: 'maço' }, { name: 'Caldo de galinha', amount: 1, unit: 'tablete' }],
    instructions: ['Cozinhe o frango em 2 litros de água com o tablete de caldo até desfiar.', 'Retire o frango, desfie e reserve. Mantenha o caldo na panela.', 'Adicione o arroz lavado ao caldo e cozinhe por 10 minutos.', 'Acrescente a cenoura e a batata cortadas em cubos pequenos.', 'Volte o frango desfiado para a panela e cozinhe até o arroz e os legumes estarem macios.', 'Finalize com cheiro-verde picado e sirva quente.'],
    prep_time: 15, cook_time: 40, servings: 6, difficulty: 'medium', category: 'Sopas'
  },
  {
    title: 'Pastel de Forno',
    description: 'Pastel assado com massa podre e recheio de carne, versão mais leve e prática.',
    ingredients: [{ name: 'Farinha de trigo', amount: 3, unit: 'xícaras' }, { name: 'Manteiga', amount: 150, unit: 'g' }, { name: 'Ovo', amount: 1, unit: 'un' }, { name: 'Carne moída', amount: 300, unit: 'g' }, { name: 'Cebola', amount: 1, unit: 'un' }, { name: 'Alho', amount: 2, unit: 'dentes' }, { name: 'Azeitona verde', amount: 50, unit: 'g' }],
    instructions: ['Prepare a massa: misture farinha, manteiga gelada em cubos, ovo e uma pitada de sal até formar uma massa homogênea. Deixe descansar na geladeira por 30 minutos.', 'Refogue a cebola e o alho, adicione a carne moída e cozinhe até dourar.', 'Misture as azeitonas picadas e ajuste o sal e a pimenta. Deixe esfriar.', 'Abra a massa em uma superfície enfarinhada e corte em círculos.', 'Recheie cada círculo, dobre ao meio e feche as bordas com um garfo.', 'Pincele com gema e leve ao forno a 200°C por 25 minutos ou até dourar.'],
    prep_time: 40, cook_time: 25, servings: 6, difficulty: 'hard', category: 'Petiscos'
  },
  {
    title: 'Bruschetta de Tomate e Manjericão',
    description: 'Entrada italiana simples e saborosa, perfeita para petiscar.',
    ingredients: [{ name: 'Pão italiano ou baguete', amount: 4, unit: 'fatias' }, { name: 'Tomate', amount: 3, unit: 'un' }, { name: 'Manjericão fresco', amount: 6, unit: 'folhas' }, { name: 'Alho', amount: 1, unit: 'dente' }, { name: 'Azeite', amount: 3, unit: 'colheres (sopa)' }],
    instructions: ['Corte o pão em fatias e toste no forno ou na frigideira.', 'Esfregue o dente de alho em cada fatia de pão.', 'Pique os tomates em cubos pequenos, tempere com azeite, sal, pimenta e manjericão picado.', 'Distribua a mistura de tomate sobre as fatias de pão.', 'Regue com um fio de azeite e sirva imediatamente.'],
    prep_time: 10, cook_time: 5, servings: 4, difficulty: 'easy', category: 'Petiscos'
  },
  {
    title: 'Mingau de Aveia',
    description: 'Mingau cremoso e nutritivo de aveia, ideal para um café da manhã quentinho.',
    ingredients: [{ name: 'Aveia em flocos', amount: 4, unit: 'colheres (sopa)' }, { name: 'Leite', amount: 300, unit: 'ml' }, { name: 'Açúcar ou mel', amount: 2, unit: 'colheres (sopa)' }, { name: 'Canela em pó', amount: 1, unit: 'colher (chá)' }],
    instructions: ['Em uma panela, misture a aveia e o leite.', 'Cozinhe em fogo médio, mexendo sempre, até engrossar (cerca de 5 minutos).', 'Adicione o açúcar ou mel e misture bem.', 'Sirva em uma tigela polvilhada com canela.', 'Opcional: adicione frutas picadas como banana ou maçã.'],
    prep_time: 2, cook_time: 5, servings: 1, difficulty: 'easy', category: 'Café da Manhã'
  }
]

async function seedAll() {
  const { data: existingUser } = await supabase.auth.admin.getUserById(USER_ID)

  if (!existingUser?.user) {
    console.log('Criando usuário de teste...')
    const { error } = await supabase.auth.admin.createUser({
      id: USER_ID,
      email: 'teste@email.com',
      password: '123456',
      email_confirm: true,
    })
    if (error) { console.error('Erro ao criar usuário:', error.message); return }
    console.log('Usuário criado com sucesso!')
  } else {
    console.log('Usuário já existe.')
  }

  const { data: cats } = await supabase.from('categories').select('id, name')
  const catMap = Object.fromEntries((cats || []).map(c => [c.name, c.id]))

  const { data: existing } = await supabase.from('recipes').select('id').limit(1)
  if (existing && existing.length > 0) {
    console.log(`${existing.length} receita(s) já existem. Pulando seed de receitas.`)
    return
  }

  console.log(`Inserindo ${recipes.length} receitas...`)
  for (const r of recipes) {
    const category_id = catMap[r.category]
    if (!category_id) { console.warn(`Categoria não encontrada: ${r.category}`); continue }

    const { error } = await supabase.from('recipes').insert({
      user_id: USER_ID,
      title: r.title,
      description: r.description,
      ingredients: r.ingredients,
      instructions: r.instructions,
      prep_time: r.prep_time,
      cook_time: r.cook_time,
      servings: r.servings,
      difficulty: r.difficulty,
      category_id,
    })

    if (error) console.error(`Erro ao inserir "${r.title}":`, error.message)
    else console.log(`  ✓ ${r.title}`)
  }
  console.log('Seed concluído!')
}

seedAll()
