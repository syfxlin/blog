v1alpha1.extension_repo(name='tilt-extensions', url='https://github.com/syfxlin/tilt-extensions')
v1alpha1.extension(name='deployment', repo_name='tilt-extensions', repo_path='deployment')
v1alpha1.extension(name='nodejs_template', repo_name='tilt-extensions', repo_path='nodejs_template')
load('ext://deployment', 'deployment')
load('ext://nodejs_template', 'nodejs_static_template')

allow_k8s_contexts(k8s_context())
deployment(
    name='blog',
    image='cr.ixk.me/syfxlin/blog',
    namespace='production',
    registry_secret='cr-ixk-me',
    dockerfile_contents=nodejs_static_template(
        inject_prepare=["""
            RUN apk --no-cache add git \
                shadow \
                gcc \
                musl-dev \
                autoconf \
                automake \
                make \
                libtool \
                nasm \
                tiff \
                jpeg \
                zlib \
                zlib-dev \
                file \
                pkgconf \
                util-linux
        """]
    ),
    build_secrets=['id=build,src=.env'],
    ports=[80],
    ingress=['blog.ixk.me'],
    ingress_tls=True
)
