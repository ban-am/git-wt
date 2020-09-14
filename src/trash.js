// const { token }  = rootStore.apiStore;

//   const [token, setToken] = useState<string>("");

//   const [regex, setRegex] = useState<string>("\\d+");
//   const [task, setTask] = useState<string>("SMAR-2627_Add_support_for_overlay_Native_Close_event_to_trigger_an_action");
//   const [taskNumber, setTaskNumber] = useState<string>("");

//   const [api, setApi] = useState<any>(null);
//   const [user, setUser] = useState<any>(null);
//   const [apiCheck, setApiCheck] = useState<boolean>(false);

//   const checkUserToken = async () => {
//     if(!token)
//       return;

//     // var gitApi: any = api;

//     if(!api) {
//       var gitApi = new Gitlab({
//         host: "https://gitlab.webix.de/",
//         token: token
//       });
//       var user = await gitApi.Users.current();
//     }

//     setApiCheck(true);
//     try {
//       var user = await api.Users.current();
//       setUser(user);
//     } catch (error) {
//       setUser(null as any);
//     }
    
//     setApi(gitApi);
//     console.log(user)
//     setApiCheck(false);
//   };

//   const testRegex = () => {
//     var data = task.match(regex);
//     if(data)
//     {
//       setTaskNumber(data[0])
//     }
//   }

//   return (
//     <div>
//       <Container>
//         <Header as='h1'>User Token: K6pXVxfcP3VkHjBPBSz_</Header>
//         <Input action={{
//           color: user == null ? 'red' : 'green',
//           icon: 'check',
//           onClick: () => checkUserToken()
//         }} icon='key' iconPosition='left' placeholder='Your token'
//         onChange={e => setToken(e.target.value)}
//         loading={apiCheck} 
//         error={user == null} 
//         disabled={user != null}/>


//         <br />


//         <Header as='h2'>Task number parsing logic</Header>
//         <Input onChange={e => setRegex(e.target.value)} value={regex} placeholder='Regex'/>
//         <Input onChange={e => setTask(e.target.value)} value={task} placeholder='Branche text'/>
//         <Button onClick={testRegex}>test</Button>
//         {taskNumber && 
//         (
//           <div>
//             {taskNumber}
//           </div>
//         )
//         }
//         <br />

//         {user && (<>
//           <Header sub>User:</Header>
//           <span>{user.name}</span>
//         </>)}
        
//         {user && (
//           <Events api={api} user={user}  regex={regex} /> 
//         )}
        
//       </Container>
//     </div>
//   );