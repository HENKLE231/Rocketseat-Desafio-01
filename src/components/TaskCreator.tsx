import {ChangeEvent, FormEvent, InvalidEvent, useState} from 'react';
import {PlusCircle} from '@phosphor-icons/react';
import {v4} from 'uuid';
import style from './TaskCreator.module.css';
import {Task} from './Task';
import clipboard from '../assets/clipboard.svg'

export interface TaskType {
    id: string;
    isDone: boolean;
    text: string;
}

export function TaskCreator() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const [newTaskText, setNewTaskText] = useState('');

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        const newTask: TaskType = {
            id: v4(), 
            isDone: false,
            text: newTaskText,
        };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        resizeTextArea(event.target);
        event.target.setCustomValidity('');
        setNewTaskText(event.target.value);
    }

    function editTaskConclusion(taskToEdit: TaskType) {
        const newTaskSet = tasks.map(
            (task) => {
                if (task.id != taskToEdit.id) {
                    return task;
                } else {
                    taskToEdit.isDone = !taskToEdit.isDone
                    return taskToEdit
                }
            }
        );
        setTasks(newTaskSet);
    }

    function deleteTask(id: string) {
        const newTaskSet = tasks.filter(task => {
            return task.id != id;
        })
        setTasks(newTaskSet);
    }

    function resizeTextArea(textArea: HTMLTextAreaElement) {
        // Verifica numero de linhas e altura do campo.
        const numRows = textArea.value.split('\n').length;
        const lineHeight = parseInt(window.getComputedStyle(textArea).getPropertyValue('line-height').replace('px', ''));
        let height = textArea.clientHeight;

        // Verifica se precisa retirar linhas.
        while (height > (numRows + 2) * lineHeight) {
            textArea.rows -= 1;
            height = textArea.clientHeight;
        }

        // Verifica se precisa acrescentar linhas.
        while (textArea.scrollHeight > textArea.offsetHeight) {
            textArea.rows += 1;
        }
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    const isNewTaskEmpty = newTaskText.length == 0;
    const numDoneTasks = tasks.filter((task) => task.isDone).length;
    const numTasks = tasks.length;

    return (
        <div>
            <form onSubmit={handleCreateNewTask} className={style.FormNewTask}>
                <textarea
                    name='task'
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required
                    rows={1}
                ></textarea>
                <button type='submit' className={style.buttonCreateTask} disabled={isNewTaskEmpty}>
                    <span>Criar</span>
                    <PlusCircle className={style.plusCircle} weight='bold' />
                </button>
            </form>

            <div>
                <div className={style.tasksInfo}>
                    <div>
                        <span className={style.createdTasks}>Tarefas criadas</span>
                        <span className={style.infoNumbers}>{numTasks}</span>
                    </div>
                    <div>
                        <span className={style.doneTasks}>Concluídas</span>
                        <span className={style.infoNumbers}>{numDoneTasks + ' de ' + numTasks}</span>
                    </div>
                </div>
                {
                    tasks.length > 0 ?
                    <div className={style.tasklist}>
                        {
                            tasks.map(task => {
                                return <Task
                                    key={task.id}
                                    task={task}
                                    onDeleteTask={deleteTask}
                                    onEditTaskConclusion={editTaskConclusion}
                                />
                            })
                        }
                    </div> :
                    <div className={style.emptyTaskList}>
                        <div className={style.clipboardWrapper}>
                            <img src={clipboard} />
                        </div>
                        <p>
                            <strong>Você ainda não tem tarefas cadastradas</strong><br />
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}