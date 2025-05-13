<script lang="ts">
    import { onMount } from 'svelte';

    // Tipo para uma tarefa
    type Tarefa = {
        id: number;
        titulo: string;
        descricao: string;
        status: string;
    };

    // Lista de tarefas e nova tarefa
    let tarefas: Tarefa[] = [];
    let novaTarefa = { titulo: '', descricao: '' };

    // Controle do popup
    let mostrarPopup = false;
    let mensagemPopup = '';
    let corPopup = 'bg-green-500'; // Cor padrão do popup

    // Função para exibir o popup
    function exibirPopup(mensagem: string, cor: string) {
        mensagemPopup = mensagem;
        corPopup = cor; // Define a cor do popup
        mostrarPopup = true;
        setTimeout(() => {
            mostrarPopup = false;
        }, 3000); // Ocultar após 3 segundos
    }

    // Função para buscar tarefas do backend
    async function buscarTarefas() {
        try {
            const resposta = await fetch('http://localhost:3000/tarefas');
            if (!resposta.ok) {
                throw new Error('Erro ao buscar tarefas');
            }
            tarefas = await resposta.json() as Tarefa[];
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    }

    // Função para adicionar uma nova tarefa
    async function adicionarTarefa() {
        try {
            await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...novaTarefa, status: 'pendente' }) // Adiciona status padrão
            });
            novaTarefa = { titulo: '', descricao: '' }; // Limpar o formulário
            await buscarTarefas(); // Atualizar a lista de tarefas
            exibirPopup('Tarefa adicionada com sucesso!', 'bg-green-500'); // Popup verde
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            exibirPopup('Erro ao adicionar tarefa!', 'bg-red-500'); // Popup vermelho
        }
    }

    // Função para marcar uma tarefa como concluída
    async function concluirTarefa(id: number) {
        try {
            await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'concluida' })
            });
            await buscarTarefas();
            exibirPopup('Tarefa concluída!', 'bg-green-500'); // Popup verde
        } catch (error) {
            console.error('Erro ao concluir tarefa:', error);
            exibirPopup('Erro ao concluir tarefa!', 'bg-red-500'); // Popup vermelho
        }
    }

    // Função para excluir uma tarefa
    async function excluirTarefa(id: number) {
        try {
            await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: 'DELETE'
            });
            await buscarTarefas();
            exibirPopup('Tarefa excluída!', 'bg-red-500'); // Popup vermelho
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            exibirPopup('Erro ao excluir tarefa!', 'bg-red-500'); // Popup vermelho
        }
    }

    // Buscar tarefas ao carregar o componente
    onMount(buscarTarefas);
</script>

<div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg relative">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Gerenciador de Tarefas</h1>

    <!-- Popup -->
    {#if mostrarPopup}
        <div class={`absolute top-4 right-4 ${corPopup} text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300`}>
            {mensagemPopup}
        </div>
    {/if}

    <!-- Lista de Tarefas -->
    <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Lista de Tarefas</h2>
        <ul class="space-y-4">
            {#each tarefas as tarefa (tarefa.id)}
                <li 
                    class="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                    class:opacity-50={tarefa.status === 'concluida'}
                >
                    <div>
                        <strong class="text-lg text-gray-800">{tarefa.titulo}</strong>
                        <p class="text-sm text-gray-600">{tarefa.descricao}</p>
                        <span class="text-xs text-gray-500">{tarefa.status}</span>
                    </div>
                    <div class="space-x-2">
                        {#if tarefa.status === 'pendente'}
                            <button 
                                on:click={() => concluirTarefa(tarefa.id)} 
                                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-transform transform hover:scale-110">
                                Concluir
                            </button>
                        {/if}
                        <button 
                            on:click={() => excluirTarefa(tarefa.id)} 
                            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-110">
                            Excluir
                        </button>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    <!-- Formulário para Adicionar Nova Tarefa -->
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Adicionar Nova Tarefa</h2>
        <form on:submit|preventDefault={adicionarTarefa} class="space-y-4">
            <input 
                type="text" 
                bind:value={novaTarefa.titulo} 
                placeholder="Título" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-shadow hover:shadow-md" 
                required 
            />
            <textarea 
                bind:value={novaTarefa.descricao} 
                placeholder="Descrição" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 transition-shadow hover:shadow-md" 
                rows="3"
                required
            ></textarea>
            <button 
                type="submit" 
                class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
                Adicionar
            </button>
        </form>
    </div>

    <!-- Informações do Desenvolvedor -->
    <footer class="mt-12 text-center">
        <div class="bg-blue-600 text-white py-4 rounded-lg shadow-md">
            <p class="text-lg font-semibold">Desenvolvido por:</p>
            <p class="text-xl font-bold">Bryan Fernandes</p>
            <p class="text-sm">
                GitHub: 
                <a 
                    href="https://github.com/BryanFernanDESdev" 
                    class="underline hover:text-gray-200 transition-transform transform hover:scale-110"
                    style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);"
                >
                    BryanFernanDESdev
                </a>
            </p>
            <p class="text-sm">
                E-mail: 
                <a 
                    href="mailto:bryanfernandesse@gmail.com" 
                    class="underline hover:text-gray-200 transition-transform transform hover:scale-110"
                >
                    bryanfernandesse<span class="text-yellow-300 animate-pulse">@</span>gmail.com
                </a>
            </p>
        </div>
    </footer>
</div>