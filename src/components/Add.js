import React from 'react';
import {postNewJob} from '../services/jobs';


class Add extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            job: {
                title:'',
                email: '',
                company: '',
                homepage: '',
                description: ''
            },
            isLoading: false,
            error: null
        };
    };

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
            const postedBook = await postNewJob(this.state.job);
            console.log(postedBook.id);
            changeView('details', { id: postedBook.id });
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
                <button onClick={this.handleSave.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
}

export default Add;