import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'https://api.dev.dex.guru/v1/chain/56/tokens/0x75e457c1AD98bCC78ae676E9a87A324807475B6b/market?api-key=O0E2up_-tAetzJwjWtYo9sUnibaw0oXFKVS69ywMtso'
        );
        setUsers([response.data]); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Can't load data from server</div>;
  if (!users) return null;
  return (
    <ul>
      {users.map(user => (
        <li key={user.address}>
          {user.volume_24h_usd}
        </li>
      ))}
    </ul>
  );
}

function Users2() {
    const [users2, setUsers2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers2 = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          setUsers2(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            'https://api.dev.dex.guru/v1/chain/56/tokens/0x75e457c1AD98bCC78ae676E9a87A324807475B6b/market?api-key=O0E2up_-tAetzJwjWtYo9sUnibaw0oXFKVS69ywMtso'
          );
          setUsers2([response.data]); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
  
      fetchUsers2();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Can't load data from server</div>;
    if (!users2) return null;
    return (
      <ul>
        {users2.map(user2 => (
          <li key={user2.address}>
            {user2.liquidity_usd}
          </li>
        ))}
      </ul>
    );
  }

  function Users3() {
    const [users3, setUsers3] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers3 = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          setUsers3(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            'https://api.dev.dex.guru/v1/chain/56/tokens/0x75e457c1AD98bCC78ae676E9a87A324807475B6b/market?api-key=O0E2up_-tAetzJwjWtYo9sUnibaw0oXFKVS69ywMtso'
          );
          setUsers3([response.data]); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
  
      fetchUsers3();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Can't load data from server</div>;
    if (!users3) return null;
    return (
      <ul>
        {users3.map(user3 => (
          <li key={user3.address}>
            {user3.price_usd*1000}
          </li>
        ))}
      </ul>
    );
  }



  function Users4() {
    const [users4, setUsers4] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers4 = async () => {
        try {
          // 요청이 시작 할 때에는 error 와 users 를 초기화하고
          setError(null);
          setUsers4(null);
          // loading 상태를 true 로 바꿉니다.
          setLoading(true);
          const response = await axios.get(
            'https://api.dev.dex.guru/v1/chain/56/tokens/0x75e457c1AD98bCC78ae676E9a87A324807475B6b/market?api-key=O0E2up_-tAetzJwjWtYo9sUnibaw0oXFKVS69ywMtso'
          );
          setUsers4([response.data]); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
  
      fetchUsers4();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Can't load data from server</div>;
    if (!users4) return null;
    return (
      <ul>
        {users4.map(user4 => (
          <li key={user4.address}>
            {user4.price_usd*1000000000}
          </li>
        ))}
      </ul>
    );
  }



  export {Users, Users2, Users3, Users4};