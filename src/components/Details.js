import React from 'react';
import {getJobById} from '../services/jobs'

class Details extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            job: {
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

    handleClick(id, view, event){
        const { changeView } = this.props
        changeView(view, { id })
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
            return <div>Loading...</div>
        }

        return (
              <article>
                <div className='row'>
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">
                                    <h2 className='small-header'>{job.title}</h2>
                                </span>
                                <div>
                                    <p>Company: {job.company}</p>
                                    <p>Homepage: <a href={job.homepage}>{job.homepage}</a></p>
                                    <p>Email: <a href={`mailto:  ${job.email}`}>{job.email}</a></p>
                                    <p>Created: {job.createdAt ? job.createdAt.slice(0,10) : "-"}</p>
                                    <p>Details: {job.description}</p>
                                </div>
                                <div>
                                    <button className="btn-small waves-light grey" onClick={this.handleClick.bind(this, job.id, 'edit')}>
                                        Edit
                                    </button>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </article>
        )
    }
}

export default Details;