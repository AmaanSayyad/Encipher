import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import chevronUp from '../svg/chevron-up.svg';
import { networkIcons } from '../utils/constants';
import './network.css';

export function Network() {
  const { isConnected } = useAccount();
  const { chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const primaryChain = chains[0];

  console.log(primaryChain,"primary")
  if (!isConnected || !primaryChain) return null;

  const icon = networkIcons[primaryChain.id];
  const isUnsupported = false;

  return (
    <div className="header-item">
      <div className="dropdown-head">
        {icon && <img width="18" src={icon} alt={primaryChain.name} />}{' '}
        {isUnsupported ? (
          <span>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Unsupported
          </span>
        ) : (
          <p>{primaryChain.name}</p>
        )}
        <button className="arrow arrow-down">
          <img src={chevronUp} alt="" />
        </button>
      </div>
      <div className="dropdown-body">
        {chains.map((c) => (
          <button
            className="hbutton hbutton-lnk"
            style={{ paddingLeft: 0, textTransform: 'none' }}
            key={c.id}
            onClick={() => switchNetwork?.(c.id)}
          >
            <img width="18" src={networkIcons[c.id]} alt={c.name} />
            &nbsp;
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
