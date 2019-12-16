import React from 'react';
import { putEditJob, getJobById } from '../services/jobs';


class Edit extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            job: {
                title:'',
                email: '',
                company: '',
                homepage: '',
                createdAt: '',
                description: ''
            },
            isLoading: false,
            error: null
        };
    };

    async componentDidMount(){
        try{
            const { id } = this.props
            this.setState({isLoading: true});
            const job = await getJobById(id);
            this.setState({
                job,
                isLoading: false
            })
        }catch(error){
            this.setState({error});
        }
        console.log(typeof this.state.job.createdAt)
    }

    handleChange(field, event){
        const { job } = this.state;
        job[field] = event.target.value;
        this.setState({ job });
    }

    async handleSave(event){
        event.preventDefault();
        try{
            this.setState({isLoading: true});
            const { changeView } = this.props;
            const editedJob = await putEditJob(this.state.job);
            changeView('details', { id: editedJob.id });
        }catch(error){
            this.setState({error})
        }
        
    }

    render(){
        const { job, isLoading, error} = this.state;

        if(error){
            return(
                <div>
                    <p>Something went wrong.</p>
                    <pre>{error.message}</pre>
                    <button>Retry</button>
                </div>
            )
        }

        if(isLoading){
            return <div>Saving new job...</div>
        }

        return (
            <form>
                <label>Title: 
                    <input type='text' name='title' value={job.title} onChange={this.handleChange.bind(this, 'title')}/>
                </label>
                <label>Company: 
                    <input type='text' name='company' value={job.company} onChange={this.handleChange.bind(this, 'company')}/>
                </label>
                <label>Homepage: 
                    <input type='text' name='homepage' value={job.homepage} onChange={this.handleChange.bind(this, 'homepage')}/>
                </label>
                <label>Email:
                    <input type='text' name='email' value={job.email} onChange={this.handleChange.bind(this, 'email')}/>
                </label>
                <label>Description:
                    <input type='text' name='description' value={job.description} onChange={this.handleChange.bind(this, 'description')}/>
                </label>
                <button className="btn-small waves-light grey" onClick={this.handleSave.bind(this)}>
                    Save
                </button>  
            </form>)
    }
}

export default Edit;