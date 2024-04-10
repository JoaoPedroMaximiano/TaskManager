import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function NewTask(props) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        status: 'prioridade',
        prazo: '',
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('store-task'));
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nova tarefa</h2>}
        >
            <Head title="Nova tarefa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="nome" value="Nome" />

                                <TextInput
                                    id="nome"
                                    type="text"
                                    name="nome"
                                    value={data.nome}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />

                                <InputError message={errors.nome} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="status" value="Status" />

                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={handleOnChange}
                                    className="mt-1 block w-full"
                                >
                                    <option value="prioridade">Prioridade</option>
                                    <option value="secundario">Secundário</option>
                                    <option value="importante">Importante</option>
                                    <option value="depois">Depois</option>
                                </select>

                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="prazo" value="Prazo" />

                                <TextInput
                                    id="prazo"
                                    type="date"
                                    name="prazo"
                                    value={data.prazo}
                                    className="mt-1 block w-full"
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />

                                <InputError message={errors.prazo} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Criar Tarefa
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
