import React from 'react';
import {getJobs} from '../services/jobs'

class Overview extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            jobs: [],
            isLoading: false,
            error: null,
            searchString: ''
        };
    };

    async componentDidMount(){
        try{
            this.setState({isLoading: true});
            const jobs = await getJobs();
            this.setState({
                jobs,
                isLoading: false
            })
        }catch(error){
            this.setState({error});
        }
    }

    handleClick(id, view, event){
        const { changeView } = this.props
        changeView(view, { id })
    }

    handleSearch(event){  
        this.setState({
            searchString: event.target.value
        })
    }

    handleClearSearch(){
        this.setState({
            searchString: ''
        })
    }

    render(){
        const { jobs, isLoading, error, searchString} = this.state;

        if(error){
            return(
                <>
                    <p>Something went wrong.</p>
                    <pre>{error.message}</pre>
                    <button>Retry</button>
                </>
            )
        }

        if(isLoading){
            return <div>Loading...</div>
        }

        // const jobsFiltered =  jobs.filter(element => {
        //     return element.title.toLowerCase().includes(searchString.toLowerCase())
        // })

        console.log(jobs);
        const jobsFiltered = jobs.filter(job => {
            for (let parameter in job){
                if (job[parameter].toLowerCase().includes(searchString.toLowerCase())){
                    return true;
                }
            }
            return false;
        })

        const jobElements = jobsFiltered.map(job => {
            return (
            <li onClick={this.handleClick.bind(this, job.id, 'details')} key={job.id}>
                <a href="#!" className="collection-item">
                    <h2 className="small-header">
                        {job.title}
                    </h2>
                    <p>
                        {job.createdAt ? job.createdAt.slice(0,10) : " -"}
                    </p>
                </a>
            </li>)
        })
        return (
            <>
                <p>Find your dream job or post an available position at your company!</p>
                <form>
                    <div className="input-field">
                    <i className="material-icons prefix">search</i>
                        <input onChange={this.handleSearch.bind(this)} id="search" type="search" value={searchString}/>
                        <label className="label-icon" htmlFor="search"></label>
                        <i onClick={this.handleClearSearch.bind(this)} className="material-icons">close</i>
                    </div>
                </form>
                <ul className="collection">
                    {jobElements}
                </ul>
            </>
        )
    }
}

export default Overview;