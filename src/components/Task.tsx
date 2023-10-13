import {TaskType} from './TaskCreator'
import {Trash, Check} from '@phosphor-icons/react'
import style from './Task.module.css'

interface TaskProps {
    task: TaskType,
    onDeleteTask: (id: string) => void;
    onEditTaskConclusion: (taskToChange: TaskType) => void;
}

export function Task({task, onDeleteTask, onEditTaskConclusion}: TaskProps) {
    
    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

    function handleTaskConclusion() {
        onEditTaskConclusion(task)
    }

    return (
        <div className={style.task}>
            <div onClick={handleTaskConclusion} className={style.circle}>
                {
                    task.isDone ?
                    <Check className={style.checkedCircle} weight='bold' /> :
                    <div className={style.uncheckedCircle}></div>
                }
            </div>

            <p>{task.text}</p>

            <button className={style.trash} onClick={handleDeleteTask} title="Deletar tarefa">
                <Trash />
            </button>
        </div>
    );
}