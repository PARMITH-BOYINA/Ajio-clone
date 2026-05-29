# ajio-clone Helm Chart

This chart deploys the Ajio clone frontend and backend services.

Usage examples:

Install with default values:

```bash
helm install ajio ./helm/ajio-clone
```

To enable ingress, edit `values.yaml` and set `ingress.enabled: true` and configure hosts.

To use the Gateway API with an Envoy-based gateway instead of Ingress, enable the gateway section in `values.yaml`:

```yaml
gateway:
	enabled: true
	createGatewayClass: false # set true if you want the chart to create the GatewayClass
	gatewayClassName: envoy-gateway-class
	gateway:
		name: ajio-envoy-gateway
		namespace: default
	listener:
		port: 80
	hosts:
		- host: example.local
			paths:
				- path: /
					backend: frontend
				- path: /api
					backend: backend
```

Note: This chart assumes an Envoy Gateway controller is running in the cluster (controllerName: `envoy.gateway.networking.k8s.io`). If you don't have it installed, follow the Envoy Gateway project installation instructions for your cluster.

Docker repository images
-------------------------
This chart is configured to pull images from a Docker repository. Update the repository names in `ajio_clone2/helm/ajio-clone/values.yaml` before installing.

Example values:

```yaml
backend:
  image:
    repository: docker.io/yourdockerhubuser/ajio-backend
    tag: latest
    pullPolicy: IfNotPresent
frontend:
  image:
    repository: docker.io/yourdockerhubuser/ajio-frontend
    tag: latest
    pullPolicy: IfNotPresent
```

If your registry is private, create an image pull secret and set:

```yaml
imagePullSecrets:
  - name: regcred
```

NodePort access
----------------
This chart can expose the frontend and backend using `NodePort` services so you can access the frontend from a web browser using a node IP and port.

1. Ensure `values.yaml` sets `frontend.service.type: NodePort` and `nodePort.enabled: true`. Defaults in this chart use `30080` for frontend and `30050` for backend.

Config volume support
---------------------
If you want to mount configuration into the pods, enable `config.create: true` in `values.yaml` and provide `config.data` entries. The chart will create a ConfigMap and mount it into both frontend and backend pods at `config.mountPath`.

Example:

```yaml
config:
  create: true
  mountPath: /etc/ajio/config
  data:
    APP_SETTINGS: |
      SOME_VALUE=1
      ANOTHER_VALUE=2
```

The config is mounted as a ConfigMap volume and is available to the container filesystem at the configured path.

2. Install the chart into a namespace (example `ajio`):

```bash
kubectl create ns ajio
helm upgrade --install ajio ./helm/ajio-clone --namespace ajio -f ./helm/ajio-clone/values.yaml
```

3. Get a node IP and the NodePort for the frontend service:

```bash
# get node external IP (cloud) or internal IP
kubectl get nodes -o wide
# get the service and port
kubectl get svc -n ajio
```

4. Open the frontend in your browser:

```
http://<NODE_IP>:30080
```

If you're running Minikube, use `minikube ip` instead of node IP. If using kind, you can use `kubectl port-forward` as an alternative for local testing.
